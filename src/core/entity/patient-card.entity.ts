import { BaseEntity } from 'src/common/database/BaseEntity';
import { Status } from 'src/common/enums';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { PatientEntity } from './patient.entity';

@Entity('patient_card')
export class PatientCardEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  card_type: string;

  @Column({ type: 'varchar', unique: true })
  card_number: string;

  @Column({ type: 'smallint' })
  expire_month: number;

  @Column({ type: 'int' })
  expire_year: number;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @OneToOne(() => PatientEntity, (patient) => patient.patient_card)
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;
}
