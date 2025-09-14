import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTypeEntity } from 'src/core/entity/service-type.entity';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { catchError, successRes } from 'src/infrastructure/response';
import { ServiceTypeRepository } from 'src/core/repository/service-type.repository';

@Injectable()
export class ServiceTypeService {
  constructor(
    @InjectRepository(ServiceTypeEntity)
    private readonly serviceTypeRepo: ServiceTypeRepository,
  ) {}

  async create(createServiceTypeDto: CreateServiceTypeDto) {
    try {
      const serviceType = this.serviceTypeRepo.create(createServiceTypeDto);
      await this.serviceTypeRepo.save(serviceType);
      return successRes(serviceType, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const serviceTypes = await this.serviceTypeRepo.find({
        relations: ['services'],
      });
      return successRes(serviceTypes);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: string) {
    try {
      const serviceType = await this.serviceTypeRepo.findOne({
        where: { id },
        relations: ['services'],
      });
      if (!serviceType) {
        throw new NotFoundException('ServiceType not found!');
      }
      return successRes(serviceType);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: string, updateServiceTypeDto: UpdateServiceTypeDto) {
    try {
      const serviceType = await this.serviceTypeRepo.findOne({ where: { id } });
      if (!serviceType) {
        throw new NotFoundException('ServiceType not found!');
      }

      await this.serviceTypeRepo.update(id, updateServiceTypeDto);
      const updatedServiceType = await this.serviceTypeRepo.findOne({
        where: { id },
        relations: ['services'],
      });

      return successRes(updatedServiceType);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: string) {
    try {
      const serviceType = await this.serviceTypeRepo.findOne({ where: { id } });
      if (!serviceType) {
        throw new NotFoundException('ServiceType not found!');
      }

      await this.serviceTypeRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
