import { BaseEntity } from 'src/common/database/BaseEntity';
import { Gender, Roles } from 'src/common/enums';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { MedicalRecordEntity } from './medical-records';
import { RatingEntity } from './rating.entity';
import { PatientCardEntity } from './patient-card.entity';

@Entity('patient')
export class PatientEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient)
  appointments: AppointmentEntity[];

  @OneToMany(() => MedicalRecordEntity, (record) => record.patient)
  medical_records: MedicalRecordEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.patient)
  ratings: RatingEntity[];

  @OneToOne(() => PatientCardEntity, (card) => card.patient)
  patient_card: PatientCardEntity;
}
