import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import {UpdateProjectDto } from './dtos/updateProjetc.dto';
import {CreateProjectDto } from './dtos/createProject.dto';

@Controller('projetc')
export class ProjetcController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() body: CreateProjectDto) {
    return this.projectService.createProject(body);
  }

  @Get()
  getAllProject() {
    return this.projectService.getAllPages();
  }

  @Put(':id')
  updateProject(@Param('id') id: number, @Body() body: UpdateProjectDto) {
    return this.projectService.updatePage(id, body);
  }

  @Delete(':id')
deleteProject(@Param('id') id: string) {
  return this.projectService.deletePage(Number(id));
}
}

