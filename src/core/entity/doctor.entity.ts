import { BaseEntity } from 'src/common/database/BaseEntity';
import { Gender, Roles } from 'src/common/enums';
import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { DoctorWalletEntity } from './doctor-wallet.entity';
import { DoctorScheduleEntity } from './doctor-schedule';
import { ReferralSpecialistEntity } from './referal-specil.entity';
import { AppointmentEntity } from './appointment.entity';
import { MedicalRecordEntity } from './medical-records';
import { RatingEntity } from './rating.entity';
import { DoctorCardEntity } from './doctor-card.entity';
import { DoctorSpecialyEntity } from './doctor-specilay.entity';

@Entity('doctor')
export class DoctorEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'varchar' })
  experience: string;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;

  @OneToOne(() => DoctorWalletEntity, (wallet) => wallet.doctor, {
    cascade: true,
  })
  @JoinColumn()
  wallet: DoctorWalletEntity;

  @OneToMany(() => DoctorScheduleEntity, (schedule) => schedule.doctor, {
    cascade: true,
  })
  schedules: DoctorScheduleEntity[];

  @OneToMany(() => ReferralSpecialistEntity, (ref) => ref.doctor)
  referralSpecialistRecords: ReferralSpecialistEntity[];

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.doctor)
  appointments: AppointmentEntity[];

  @OneToMany(() => MedicalRecordEntity, (record) => record.doctor)
  medical_records: MedicalRecordEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.doctor)
  ratings: RatingEntity[];

  @OneToOne(() => DoctorCardEntity, (card) => card.doctor)
  doctor_card: DoctorCardEntity;

  @OneToMany(() => DoctorSpecialyEntity, (docSpec) => docSpec.doctor)
  doctor_specializations: DoctorSpecialyEntity[];
}
