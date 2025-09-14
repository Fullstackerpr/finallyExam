import { BaseEntity } from 'src/common/database/BaseEntity';
import { State } from 'src/common/enums';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';
import { MedicalRecordEntity } from './medical-records';

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  appointment_type: string;

  @Column({ type: 'date' })
  scheduled_at: Date;

  @Column({ type: 'enum', enum: State, default: State.PENDING })
  state: State;

  @ManyToOne(() => PatientEntity, (patient) => patient.appointments)
  patient: PatientEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments)
  doctor: DoctorEntity;

  @OneToMany(
    () => MedicalRecordEntity,
    (medicalRecord) => medicalRecord.appointment,
  )
  medical_records: MedicalRecordEntity[];
}
