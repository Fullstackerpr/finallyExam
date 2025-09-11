import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';
import { DoctorModule } from './doctor/doctor.module';
import { AdminModule } from './admin/admin.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { DoctorCardModule } from './doctor-card/doctor-card.module';
import { PatientCardModule } from './patient-card/patient-card.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { SpecializationModule } from './specialization/specialization.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ['dist/core/entity/*.entity{.ts, .js}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    DoctorModule,
    AdminModule,
    PatientModule,
    AppointmentModule,
    DoctorCardModule,
    PatientCardModule,
    MedicalRecordsModule,
    RatingModule,
    SpecializationModule
  ]
})
export class AppModule {}
