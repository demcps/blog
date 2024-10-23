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
import { IntegrationsService } from './Integrations.service';
import { UpdateIntegrationsDto } from './dtos/updateIntegrations.dto';
import { CreateIntegrationsDto } from './dtos/createIntegrations.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import CheckRoleGuard, {  } from 'src/shared/guards/check-roles.guard';
import { authGuard } from 'src/shared/guards/auth.guard';
import { getUser } from 'src/shared/decorators/req-user.decorator';

@ApiTags('Integrations')
@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly IntegrationsService: IntegrationsService) {}

  @ApiOperation({
    summary: 'Create a new Integrations',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth() 
  @UseGuards(CheckRoleGuard(['ADMIN'])) 
  @UseGuards(authGuard(false)) 
  @Post()
  createPage(@getUser('id') userId: number, @Body() body: CreateIntegrationsDto) {
    return this.IntegrationsService.createIntegration(body);
  }

  @ApiOperation({
    summary: 'Get all Integrations',
  })
  @Get()
  getAllPages() {
    return this.IntegrationsService.getAllIntegrations();
  }

  @ApiOperation({
    summary: 'Update a Integrations by ID',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth() 
  @UseGuards(CheckRoleGuard(['ADMIN'])) 
  @UseGuards(authGuard(false)) 
  @Put(':id')
  updatePage(
    @getUser('id') userId: number,
    @Param('id') id: string,
    @Body() body: UpdateIntegrationsDto
  ) {
    return this.IntegrationsService.updateIntegration(Number(id), body);
  }

  @ApiOperation({
    summary: 'Delete a Integrations by ID',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth() 
  @UseGuards(CheckRoleGuard(['ADMIN'])) 
  @UseGuards(authGuard(false)) 
  @Delete(':id')
  deletePage(
    @getUser('id') userId: number,
    @Param('id') id: string
  ) {
    return this.IntegrationsService.deleteIntegration(Number(id));
  }
}
