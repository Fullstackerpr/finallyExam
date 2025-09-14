import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecailizationRepository } from 'src/core/repository/specialization.repository';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { catchError, successRes } from 'src/infrastructure/response';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { SpecializationEntity } from 'src/core/entity/specialization.entity';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectRepository(SpecializationEntity)
    private readonly specialRepo: SpecailizationRepository,
  ) {}

  async create(createSpecializationDto: CreateSpecializationDto) {
    try {
      const { name } = createSpecializationDto;
      const specialName = await this.specialRepo.findOne({ where: { name } });
      if (specialName) {
        throw new ConflictException(`Specialization: ${name} already exists`);
      }
      const special = this.specialRepo.create(createSpecializationDto);
      await this.specialRepo.save(special);
      return successRes(special, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async getAll() {
    try {
      const specials = await this.specialRepo.find();
      return successRes(specials);
    } catch (error) {
      return catchError(error);
    }
  }

  async getById(id: string) {
    try {
      const special = await this.specialRepo.findOne({ where: { id } });
      if (!special) {
        throw new NotFoundException('Specail is not found!');
      }

      return successRes(special);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(updateSpecializationDto: UpdateSpecializationDto, id: string) {
    try {
      const { name } = updateSpecializationDto;

      const special = await this.specialRepo.findOne({ where: { id } });
      if (!special) {
        throw new NotFoundException('Specail is not found!');
      }

      const specialName = await this.specialRepo.findOne({ where: { name } });
      if (specialName) {
        throw new ConflictException(`Specialization: ${name} already exists`);
      }

      await this.specialRepo.update(id, updateSpecializationDto);
      const updateSpecial = await this.specialRepo.findOne({ where: { id } });
      return successRes(updateSpecial);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: string) {
    try {
      const special = await this.specialRepo.findOne({ where: { id } });
      if (!special) {
        throw new NotFoundException('Specail is not found!');
      }

      await this.specialRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
