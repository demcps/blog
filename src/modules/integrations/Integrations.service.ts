import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IntegrationsRepository } from './Integrations.repository';
import { CreateIntegrationsDto } from './dtos/createIntegrations.dto';
import { UpdateIntegrationsDto } from './dtos/updateIntegrations.dto';
import { Integration } from '@prisma/client';
import { getResponseMessage } from 'src/shared/constants/messages.constant';

@Injectable()
export class IntegrationsService {
  constructor(private integrationsRepository: IntegrationsRepository) {}

  async getAllIntegrations(): Promise<Integration[]> {
    try {
      return await this.integrationsRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }

  async getIntegrationById(id: number): Promise<Integration> {
    const integration = await this.integrationsRepository.findById(id);

    if (!integration) {
      throw new NotFoundException(getResponseMessage("INTEGRATION_NOT_FOUND")); 
    }

    return integration;
  }

  async createIntegration(createIntegrationDto: CreateIntegrationsDto): Promise<Integration> {
    try {
      return await this.integrationsRepository.create(createIntegrationDto); 
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }

  async updateIntegration(id: number, updateIntegrationDto: UpdateIntegrationsDto): Promise<Integration> {
    const integration = await this.integrationsRepository.findById(id); 
    if (!integration) {
      throw new NotFoundException(getResponseMessage("INTEGRATION_NOT_FOUND"));
    }

    try {
      return await this.integrationsRepository.update(id, updateIntegrationDto);
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }

  async deleteIntegration(id: number): Promise<Integration> {
    const integration = await this.integrationsRepository.findById(id);
    if (!integration) {
      throw new NotFoundException(getResponseMessage("INTEGRATION_NOT_FOUND"));
    }

    try {
      return await this.integrationsRepository.delete(id); 
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }
}
