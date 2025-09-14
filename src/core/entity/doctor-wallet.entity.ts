import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DoctorEntity } from './doctor.entity';

@Entity('doctor_wallet')
export class DoctorWalletEntity extends BaseEntity {
  @Column({ type: 'bigint', default: 0 })
  balance: number;

  @OneToOne(() => DoctorEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
