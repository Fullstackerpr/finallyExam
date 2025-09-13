import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorCardEntity } from 'src/core/entity/doctor-card.entity';
import { DoctorCardRepository } from 'src/core/repository/doctor-card.repository';
import { CreateDoctorCardDto } from './dto/create-doctor-card.dto';
import { catchError, successRes } from 'src/infrastructure/response';
import { UpdateDoctorCardDto } from './dto/update-doctor-card.dto';

@Injectable()
export class DoctorCardService {
  constructor(
    @InjectRepository(DoctorCardEntity)
    private readonly doctorcardRepo: DoctorCardRepository,
  ) {}

  async createDoctorCard(createDoctorCardDto: CreateDoctorCardDto) {
    try {
      const { card_number } = createDoctorCardDto;

      const cardNumber = await this.doctorcardRepo.findOne({
        where: { card_number },
      });

      if (cardNumber) {
        throw new ConflictException(`Card at ${card_number} already exists`);
      }

      const doctorCard = this.doctorcardRepo.create(createDoctorCardDto);
      await this.doctorcardRepo.save(doctorCard);

      return successRes(doctorCard, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async getAllDoctorCard() {
    try {
      const doctorCard = await this.doctorcardRepo.find();
      return successRes(doctorCard);
    } catch (error) {
      return catchError(error);
    }
  }

  async getByIdDoctorCard(id: string) {
    try {
      const doctorCard = await this.doctorcardRepo.findOne({ where: { id } });
      if (!doctorCard) {
        throw new NotFoundException('Doctor Card not found!');
      }

      return successRes(doctorCard);
    } catch (error) {
      return catchError(error);
    }
  }

  async updateDoctorCard(id: string, updateDoctorCardDto: UpdateDoctorCardDto) {
    try {
      const { card_number } = updateDoctorCardDto;

      const doctorCard = await this.doctorcardRepo.findOne({ where: { id } });
      if (!doctorCard) {
        throw new NotFoundException('Doctor Card not found!');
      }

      const existsCardNum = await this.doctorcardRepo.findOne({
        where: { card_number },
      });

      if(existsCardNum) {
        throw new ConflictException('Card Number already exists')
      }

      await this.doctorcardRepo.update(id, updateDoctorCardDto);
      const updatedDoctorCard = await this.doctorcardRepo.findOne({
        where: { id },
      });

      return successRes(updatedDoctorCard);
    } catch (error) {
      return catchError(error);
    }
  }

  async deleteDoctorCard(id: string) {
    try {
      const doctorCard = await this.doctorcardRepo.findOne({ where: { id } });
      if (!doctorCard) {
        throw new NotFoundException('Doctor Card not found!');
      }

      await this.doctorcardRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
