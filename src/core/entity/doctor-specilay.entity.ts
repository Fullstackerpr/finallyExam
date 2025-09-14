// referal-specil.entity.ts

import { BaseEntity } from 'src/common/database/BaseEntity';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { DoctorEntity } from 'src/core/entity/doctor.entity';
import { SpecializationEntity } from './specialization.entity';

@Entity('doctor-specialy')
export class DoctorSpecialyEntity extends BaseEntity {
  @ManyToOne(() => DoctorEntity, (doctor) => doctor.doctor_specializations)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;

  @ManyToOne(
    () => SpecializationEntity,
    (specialization) => specialization.specialized_doctors,
  )
  @JoinColumn({ name: 'specialization_id' })
  specialization: SpecializationEntity;
}
