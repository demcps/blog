import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Integration } from '@prisma/client';

@Injectable()
export class IntegrationsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Integration[]> {
    return await this.prisma.integration.findMany();
  }

  async findById(id: number): Promise<Integration | null> {
    return await this.prisma.integration.findUnique({
      where: { id },
    });
  }

  async create(data: any): Promise<Integration> {
    return await this.prisma.integration.create({
      data,
    });
  }

  async update(id: number, data: any): Promise<Integration> {
    return await this.prisma.integration.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Integration> {
    return await this.prisma.integration.delete({
      where: { id },
    });
  }
}
