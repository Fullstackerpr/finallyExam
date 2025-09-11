import { Module } from '@nestjs/common';
import { DoctorCardService } from './doctor-card.service';
import { DoctorCardController } from './doctor-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorCardEntity } from 'src/core/entity/doctor-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorCardEntity])],
  controllers: [DoctorCardController],
  providers: [DoctorCardService],
})
export class DoctorCardModule {}
