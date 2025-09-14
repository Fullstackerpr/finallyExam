import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferralSpecialistEntity } from 'src/core/entity/referal-specil.entity';
import { catchError, successRes } from 'src/infrastructure/response';
import { Repository } from 'typeorm';
import { CreateReferralSpecialistDto } from './dto/create-referral-specialist.dto';
import { UpdateReferralSpecialistDto } from './dto/update-referral-specialist.dto';

@Injectable()
export class ReferralSpecialistService {
  constructor(
    @InjectRepository(ReferralSpecialistEntity)
    private readonly referralRepo: Repository<ReferralSpecialistEntity>,
  ) {}

  async create(createReferralDto: CreateReferralSpecialistDto) {
    try {
      const referral = this.referralRepo.create(createReferralDto);
      await this.referralRepo.save(referral);
      return successRes(referral, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const referrals = await this.referralRepo.find({
        relations: ['doctor', 'patient'],
      });
      return successRes(referrals);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: string) {
    try {
      const referral = await this.referralRepo.findOne({
        where: { id },
        relations: ['doctor', 'patient'],
      });
      if (!referral) {
        throw new NotFoundException('Referral not found!');
      }
      return successRes(referral);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: string, updateReferralDto: UpdateReferralSpecialistDto) {
    try {
      const referral = await this.referralRepo.findOne({ where: { id } });
      if (!referral) {
        throw new NotFoundException('Referral not found!');
      }

      await this.referralRepo.update(id, updateReferralDto);
      const updatedReferral = await this.referralRepo.findOne({
        where: { id },
        relations: ['doctor', 'patient'],
      });

      return successRes(updatedReferral);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: string) {
    try {
      const referral = await this.referralRepo.findOne({ where: { id } });
      if (!referral) {
        throw new NotFoundException('Referral not found!');
      }

      await this.referralRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
