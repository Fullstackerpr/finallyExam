import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorScheduleService } from './doctor-schedule.service';
import { DoctorScheduleController } from './doctor-schedule.controller';
import { DoctorScheduleEntity } from 'src/core/entity/doctor-schedule';
import { DoctorEntity } from 'src/core/entity/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorScheduleEntity, DoctorEntity])],
  controllers: [DoctorScheduleController],
  providers: [DoctorScheduleService],
})
export class DoctorScheduleModule {}
