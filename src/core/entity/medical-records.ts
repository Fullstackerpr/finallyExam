import { BaseEntity } from 'src/common/database/BaseEntity';
import { StatusMedic } from 'src/common/enums';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';

@Entity('medical-record')
export class MedicalRecordEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  complaint: string;

  @Column({ type: 'varchar' })
  anamnesis: string;

  @Column({ type: 'varchar' })
  medical_check: string;

  @Column({ type: 'varchar' })
  diagnosis: string;

  @Column({ type: 'varchar' })
  treatment: string;

  @Column({ type: 'date' })
  start_at: Date;

  @Column({ type: 'date' })
  finished_at: Date;

  @Column({ type: 'enum', enum: StatusMedic })
  status: StatusMedic;

  @ManyToOne(
    () => AppointmentEntity,
    (appointment) => appointment.medical_records,
  )
  appointment: AppointmentEntity;

  @ManyToOne(() => PatientEntity, (patient) => patient.medical_records)
  patient: PatientEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.medical_records)
  doctor: DoctorEntity;
}
