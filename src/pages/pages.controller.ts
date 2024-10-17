import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PageService } from './pages.service';
import { UpdatePageDto } from './dtos/updatePage.dto';
import { CreatePageDto } from './dtos/createPage.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PageService) {}

  @Post()
  createPage(@Body() body: CreatePageDto) {
    return this.pagesService.createPage(body);
  }

  @Get()
  getAllPages() {
    return this.pagesService.getAllPages();
  }

  @Put(':id')
  updatePage(@Param('id') id: number, @Body() body: UpdatePageDto) {
    return this.pagesService.updatePage(id, body);
  }

  @Delete(':id')
deletePage(@Param('id') id: string) {
  return this.pagesService.deletePage(Number(id));
}
}

