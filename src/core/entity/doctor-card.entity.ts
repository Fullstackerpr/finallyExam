import { BaseEntity } from 'src/common/database/BaseEntity';
import { Status } from 'src/common/enums';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DoctorEntity } from './doctor.entity';

@Entity('doctor-card')
export class DoctorCardEntity extends BaseEntity {
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

  @OneToOne(() => DoctorEntity, (doctor) => doctor.doctor_card)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
