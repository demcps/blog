import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dtos/updateProjetc.dto'; 
import { CreateProjectDto } from './dtos/createProject.dto';

@Controller('projects') 
export class ProjectController { 
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() body: CreateProjectDto) {
    return this.projectService.createProject(body);
  }

  @Get()
  getAllProjects() { 
    return this.projectService.getAllProjects();
  }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() body: UpdateProjectDto) { 
    return this.projectService.updateProject(Number(id), body);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(Number(id));
  }
}
