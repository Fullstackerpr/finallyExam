import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';

@Entity('rating')
export class RatingEntity extends BaseEntity {
  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'varchar' })
  comment: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.ratings)
  patient: PatientEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.ratings)
  doctor: DoctorEntity;
}
