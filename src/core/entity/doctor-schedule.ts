import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { DoctorEntity } from './doctor.entity';

@Entity('doctor_schedule')
export class DoctorScheduleEntity extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.schedules)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
