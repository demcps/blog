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
import { PageService } from './pages.service';
import { UpdatePageDto } from './dtos/updatePage.dto';
import { CreatePageDto } from './dtos/createPage.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import CheckRoleGuard, {  } from 'src/shared/guards/check-roles.guard';
import { authGuard } from 'src/shared/guards/auth.guard';
import { getUser } from 'src/shared/decorators/req-user.decorator';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PageService) {}

  @ApiOperation({
    summary: 'Create a new page',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth() // Requiere que el token de autenticación esté presente
  @UseGuards(CheckRoleGuard(['ADMIN'])) // Verifica que el usuario tenga el rol de 'ADMIN'
  @UseGuards(authGuard(false)) // Autenticación requerida
  @Post()
  createPage(@getUser('id') userId: number, @Body() body: CreatePageDto) {
    return this.pagesService.createPage(body);
  }

  @ApiOperation({
    summary: 'Get all pages',
  })
  @Get()
  getAllPages() {
    return this.pagesService.getAllPages();
  }

  @ApiOperation({
    summary: 'Update a page by ID',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth() 
  @UseGuards(CheckRoleGuard(['ADMIN'])) 
  @UseGuards(authGuard(false)) 
  @Put(':id')
  updatePage(
    @getUser('id') userId: number,
    @Param('id') id: string,
    @Body() body: UpdatePageDto
  ) {
    return this.pagesService.updatePage(Number(id), body);
  }

  @ApiOperation({
    summary: 'Delete a page by ID',
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
    return this.pagesService.deletePage(Number(id));
  }
}
