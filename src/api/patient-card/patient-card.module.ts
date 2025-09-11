import { Module } from '@nestjs/common';
import { PatientCardService } from './patient-card.service';
import { PatientCardController } from './patient-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientCardEntity } from 'src/core/entity/patient-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientCardEntity])],
  controllers: [PatientCardController],
  providers: [PatientCardService],
})
export class PatientCardModule {}
