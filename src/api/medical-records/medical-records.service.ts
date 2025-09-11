import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { catchError, successRes } from 'src/infrastructure/response';
import { MedicalRecordEntity } from 'src/core/entity/medical-records';
import { MedicalRecordRepository } from 'src/core/repository/medical-record.repository';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecordEntity)
    private readonly medicalRecordRepo: MedicalRecordRepository
  ) {}

  async createMedicalRecord(createDto: CreateMedicalRecordDto) {
    try {
      // const exist = await this.medicalRecordRepo.findOne({ where: { appointment_id: createDto.appointment_id } });
      // if (exist) throw new ConflictException('Medical record already exists for this appointment');

      const medicalRecord = this.medicalRecordRepo.create(createDto);
      await this.medicalRecordRepo.save(medicalRecord);

      return successRes(medicalRecord, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async getAllMedicalRecords() {
    try {
      const records = await this.medicalRecordRepo.find();
      return successRes(records);
    } catch (error) {
      return catchError(error);
    }
  }

  async getByIdMedicalRecord(id: string) {
    try {
      const record = await this.medicalRecordRepo.findOne({ where: { id } });
      if (!record) {
        throw new NotFoundException('Medical Record not found!');
      }
      return successRes(record);
    } catch (error) {
      return catchError(error);
    }
  }

  async updateMedicalRecord(id: string, updateDto: UpdateMedicalRecordDto) {
    try {
      const record = await this.medicalRecordRepo.findOne({ where: { id } });
      if (!record) {
        throw new NotFoundException('Medical Record not found!');
      }

      await this.medicalRecordRepo.update(id, updateDto);
      const updatedRecord = await this.medicalRecordRepo.findOne({ where: { id } });

      return successRes(updatedRecord);
    } catch (error) {
      return catchError(error);
    }
  }

  async deleteMedicalRecord(id: string) {
    try {
      const record = await this.medicalRecordRepo.findOne({ where: { id } });
      if (!record) {
        throw new NotFoundException('Medical Record not found!');
      }

      await this.medicalRecordRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
