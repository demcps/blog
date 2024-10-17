import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Page } from '@prisma/client';

@Injectable()
export class PageRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Page[]> {
    return await this.prisma.page.findMany();
  }

  async findById(id: number): Promise<Page | null> {
    return await this.prisma.page.findUnique({
      where: { id },
    });
  }

  async create(data: any): Promise<Page> {
    return await this.prisma.page.create({
      data,
    });
  }

  async update(id: number, data: any): Promise<Page> {
    return await this.prisma.page.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Page> {
    return await this.prisma.page.delete({
      where: { id },
    });
  }
}
