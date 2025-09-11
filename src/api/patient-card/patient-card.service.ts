import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientCardEntity } from 'src/core/entity/patient-card.entity';
import { PatientCardRepository } from 'src/core/repository/patient-card.repository';
import { CreatePatientCardDto } from './dto/create-patient-card.dto';
import { catchError, successRes } from 'src/infrastructure/response';
import { UpdatePatientCardDto } from './dto/update-patient-card.dto';

@Injectable()
export class PatientCardService {
  constructor(
    @InjectRepository(PatientCardEntity)
    private readonly patientcardRepo: PatientCardRepository,
  ) {}

  async createPatientCard(createpatientCardDto: CreatePatientCardDto) {
    try {
      const { card_number } = createpatientCardDto;

      const cardNumber = await this.patientcardRepo.findOne({
        where: { card_number },
      });

      if (cardNumber) {
        throw new ConflictException(`Card at ${card_number} already exists`);
      }

      const patientCard = this.patientcardRepo.create(createpatientCardDto);
      await this.patientcardRepo.save(patientCard);

      return successRes(patientCard, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async getAllDoctorCard() {
    try {
      const patientCard = await this.patientcardRepo.find();
      return successRes(patientCard);
    } catch (error) {
      return catchError(error);
    }
  }

  async getByIdPatientCard(id: string) {
    try {
      const patientCard = await this.patientcardRepo.findOne({ where: { id } });
      if (!patientCard) {
        throw new NotFoundException('Patient Card not found!');
      }

      return successRes(patientCard);
    } catch (error) {
      return catchError(error);
    }
  }

  async updatePatientCard(
    id: string,
    updatePatientCardDto: UpdatePatientCardDto,
  ) {
    try {
      const patientCard = await this.patientcardRepo.findOne({ where: { id } });
      if (!patientCard) {
        throw new NotFoundException('Patient Card not found!');
      }

      await this.patientcardRepo.update(id, updatePatientCardDto);
      const updatedPatientCard = await this.patientcardRepo.findOne({
        where: { id },
      });

      return successRes(updatedPatientCard);
    } catch (error) {
      return catchError(error);
    }
  }

  async deletePatientCard(id: string) {
    try {
      const patientCard = await this.patientcardRepo.findOne({ where: { id } });
      if (!patientCard) {
        throw new NotFoundException('Patient Card not found!');
      }

      await this.patientcardRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
