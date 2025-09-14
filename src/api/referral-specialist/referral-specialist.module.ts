import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralSpecialistService } from './referral-specialist.service';
import { ReferralSpecialistController } from './referral-specialist.controller';
import { ReferralSpecialistEntity } from 'src/core/entity/referal-specil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferralSpecialistEntity])],
  controllers: [ReferralSpecialistController],
  providers: [ReferralSpecialistService],
})
export class ReferralSpecialistModule {}
