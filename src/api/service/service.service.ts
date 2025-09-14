import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/core/entity/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { catchError, successRes } from 'src/infrastructure/response';
import { ServiceRepository } from 'src/core/repository/service.repository';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepo: ServiceRepository,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    try {
      const service = this.serviceRepo.create(createServiceDto);
      await this.serviceRepo.save(service);
      return successRes(service, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const services = await this.serviceRepo.find({
        relations: ['serviceType'],
      });
      return successRes(services);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: string) {
    try {
      const service = await this.serviceRepo.findOne({
        where: { id },
        relations: ['serviceType'],
      });
      if (!service) {
        throw new NotFoundException('Service not found!');
      }
      return successRes(service);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.serviceRepo.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found!');
      }

      await this.serviceRepo.update(id, updateServiceDto);
      const updatedService = await this.serviceRepo.findOne({
        where: { id },
        relations: ['serviceType'],
      });

      return successRes(updatedService);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: string) {
    try {
      const service = await this.serviceRepo.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException('Service not found!');
      }

      await this.serviceRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
