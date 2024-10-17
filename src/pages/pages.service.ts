import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PageRepository } from './Page.repository';
import { CreatePageDto } from './dtos/createPage.dto';
import { UpdatePageDto } from './dtos/updatePage.dto';
import { Page } from '@prisma/client';
import { getResponseMessage } from 'src/shared/constants/messages.constant';

@Injectable()
export class PageService {
  constructor(private pageRepository: PageRepository) {}

  async getAllPages(): Promise<Page[]> {
    try {
      return await this.pageRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }

  async getPageById(id: number): Promise<Page> {
    const page = await this.pageRepository.findById(id);

    if (!page) {
      throw new NotFoundException(getResponseMessage("PAGE_NOT_FOUND")); 
    }

    return page;
  }

  async createPage(createPageDto: CreatePageDto): Promise<Page> {
    try {
      return await this.pageRepository.create(createPageDto); 
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }

  async updatePage(id: number, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.pageRepository.findById(id); 
    if (!page) {
      throw new NotFoundException(getResponseMessage("PAGE_NOT_FOUND"));
    }

    try {
      return await this.pageRepository.update(id, updatePageDto);
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }

  async deletePage(id: number): Promise<Page> {
    const page = await this.pageRepository.findById(id);
    if (!page) {
      throw new NotFoundException(getResponseMessage("PAGE_NOT_FOUND"));
    }

    try {
      return await this.pageRepository.delete(id); 
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }
}
