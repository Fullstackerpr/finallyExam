import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSpecialyService } from './doctor-specialy.service';
import { DoctorSpecialyController } from './doctor-specialy.controller';
import { DoctorEntity } from 'src/core/entity/doctor.entity';
import { SpecializationEntity } from 'src/core/entity/specialization.entity';
import { DoctorSpecialyEntity } from 'src/core/entity/doctor-specilay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity, DoctorSpecialyEntity, SpecializationEntity])],
  controllers: [DoctorSpecialyController],
  providers: [DoctorSpecialyService],
})
export class DoctorSpecialyModule {}
