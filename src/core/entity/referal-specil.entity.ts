import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { AppointmentEntity } from './appointment.entity';

@Entity('referral_specialist')
export class ReferralSpecialistEntity extends BaseEntity {
  @ManyToOne(() => AppointmentEntity, { nullable: false })
  @JoinColumn({ name: 'appointment_id' })
  appointment: AppointmentEntity;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.referralSpecialistRecords)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;

  @Column({ type: 'varchar' })
  reason: string;
}
