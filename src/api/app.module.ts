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
import { DoctorWalletModule } from './doctor-wallet/doctor-wallet.module';
import { ServiceModule } from './service/service.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { DoctorScheduleModule } from './doctor-schedule/doctor-schedule.module';
import { DoctorSpecialyModule } from './doctor-specialy/doctor-specialy.module';
import { ReferralSpecialistModule } from './referral-specialist/referral-specialist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ['dist/core/entity/*.entity{.ts, .js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AdminModule,
    DoctorModule,
    DoctorCardModule,
    DoctorWalletModule,
    DoctorScheduleModule,
    DoctorSpecialyModule,
    PatientModule,
    PatientCardModule,
    AppointmentModule,
    MedicalRecordsModule,
    RatingModule,
    ReferralSpecialistModule,
    SpecializationModule,
    ServiceModule,
    ServiceTypeModule
  ],
})
export class AppModule {}
