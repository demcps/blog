import { BadRequestException, Injectable } from "@nestjs/common";
import { getResponseMessage } from "src/shared/constants/messages.constant";
import { ResizeService } from "./resize.service";
import { stat, mkdir, access } from "fs/promises"; 
import { InjectQueue } from "@nestjs/bull";
import { QueuesConstant } from "../../shared/constants/queues.constant";
import { Queue } from "bull";
import { ReSizeFileQueue } from "../../shared/interfaces/queues.interface";


@Injectable()
export class uploadService {
  constructor(
    private readonly resizeService: ResizeService,
    @InjectQueue(QueuesConstant.RESIZE_FILE)
    private resizeFileQueue: Queue<ReSizeFileQueue>
  ) {}

  async upload(file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException(getResponseMessage("FILE_IS_REQUIRED"));
      }

      const path_ = `./uploads/posts`;

      try {
        const state = await stat(path_);
        if (!state.isDirectory()) {
          await mkdir(path_, { recursive: true }); 
        }
      } catch (error) {
        throw new BadRequestException(getResponseMessage("DIRECTORY_ERROR"));
      }

      
      try {
        await access(file.path); 
      } catch {
        throw new BadRequestException(getResponseMessage("FILE_NOT_EXIST"));
      }

      await this.resizeFileQueue.add({
        filePath: file.path,
        width: 500,
        height: 500,
      });

      return file.filename;
    } catch (error) {
      throw new BadRequestException(getResponseMessage("UPLOAD_FAILED"));
    }
  }
}
