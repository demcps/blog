import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjetcRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    return await this.prisma.project.findMany();
  }

  async findById(id: number): Promise<Project | null> {
    return await this.prisma.project.findUnique({
      where: { id },
    });
  }

  async create(data: any): Promise<Project> {
    return await this.prisma.project.create({
      data,
    });
  }

  async update(id: number, data: any): Promise<Project> {
    return await this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Project> {
    return await this.prisma.project.delete({
      where: { id },
    });
  }
}
