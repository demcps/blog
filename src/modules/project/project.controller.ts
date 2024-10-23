import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dtos/updateProjetc.dto';
import { CreateProjectDto } from './dtos/createProject.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import CheckRoleGuard, {  } from 'src/shared/guards/check-roles.guard';
import { authGuard } from 'src/shared/guards/auth.guard';
import { getUser } from 'src/shared/decorators/req-user.decorator';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Create a new project',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth() 
  @UseGuards(CheckRoleGuard(['ADMIN'])) 
  @UseGuards(authGuard(false)) 
  @Post()
  createProject(
    @getUser('id') userId: number,
    @Body() body: CreateProjectDto
  ) {
    return this.projectService.createProject(body);
  }

  @ApiOperation({
    summary: 'Get all projects',
  })
  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @ApiOperation({
    summary: 'Update a project by ID',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth()
  @UseGuards(CheckRoleGuard(['ADMIN'])) 
  @UseGuards(authGuard(false)) 
  @Put(':id')
  updateProject(
    @getUser('id') userId: number,
    @Param('id') id: string,
    @Body() body: UpdateProjectDto
  ) {
    return this.projectService.updateProject(Number(id), body);
  }

  @ApiOperation({
    summary: 'Delete a project by ID',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth() 
  @UseGuards(CheckRoleGuard(['ADMIN'])) 
  @UseGuards(authGuard(false)) 
  @Delete(':id')
  deleteProject(
    @getUser('id') userId: number,
    @Param('id') id: string
  ) {
    return this.projectService.deleteProject(Number(id));
  }
}
