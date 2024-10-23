import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProjetcRepository } from './Project.repository';
import { UpdateProjectDto } from './dtos/updateProjetc.dto'; 
import { Project } from '@prisma/client';
import { getResponseMessage } from 'src/shared/constants/messages.constant';
import { CreateProjectDto } from './dtos/createProject.dto';

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjetcRepository) {}

  async getAllProjects(): Promise<Project[]> {
    try {
      return await this.projectRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(getResponseMessage('PROJECT_NOT_FOUND'));
    }

    return project;
  }
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectRepository.create(createProjectDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(getResponseMessage('PROJECT_NOT_FOUND'));
    }
    try {
      return await this.projectRepository.update(id, updateProjectDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteProject(id: number): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(getResponseMessage('PROJECT_NOT_FOUND'));
    }

    try {
      return await this.projectRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
