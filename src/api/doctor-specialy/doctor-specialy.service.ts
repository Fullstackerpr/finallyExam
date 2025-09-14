import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorSpecialyDto } from './dto/create-doctor-specialy.dto';
import { catchError, successRes } from 'src/infrastructure/response';
import { Repository } from 'typeorm';
import { DoctorEntity } from 'src/core/entity/doctor.entity';
import { SpecializationEntity } from 'src/core/entity/specialization.entity';
import { DoctorSpecialyEntity } from 'src/core/entity/doctor-specilay.entity';

@Injectable()
export class DoctorSpecialyService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepo: Repository<DoctorEntity>,

    @InjectRepository(SpecializationEntity)
    private readonly specializationRepo: Repository<SpecializationEntity>,

    @InjectRepository(DoctorSpecialyEntity)
    private readonly doctorSpecialyRepo: Repository<DoctorSpecialyEntity>,
  ) {}

  async create(createDto: CreateDoctorSpecialyDto) {
    try {
      const { doctor_id, specialization_id } = createDto;

      const doctor = await this.doctorRepo.findOne({
        where: { id: doctor_id },
      });
      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }

      const specialization = await this.specializationRepo.findOne({
        where: { id: specialization_id },
      });
      if (!specialization) {
        throw new NotFoundException('Specialization not found');
      }

      const newDoctorSpecialy = this.doctorSpecialyRepo.create({
        doctor,
        specialization,
      });

      await this.doctorSpecialyRepo.save(newDoctorSpecialy);

      return successRes(newDoctorSpecialy, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const items = await this.doctorSpecialyRepo.find({
        relations: ['doctor', 'specialization'],
      });
      return successRes(items);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.doctorSpecialyRepo.findOne({
        where: { id },
        relations: ['doctor', 'specialization'],
      });
      if (!item) {
        throw new NotFoundException('DoctorSpecialization record not found');
      }
      return successRes(item);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: string) {
    try {
      const item = await this.doctorSpecialyRepo.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException('DoctorSpecialization record not found');
      }
      await this.doctorSpecialyRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
