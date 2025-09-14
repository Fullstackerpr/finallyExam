import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/BaseEntity';
import { DoctorSpecialyEntity } from './doctor-specilay.entity';

@Entity('specialization')
export class SpecializationEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => DoctorSpecialyEntity, (docSpec) => docSpec.specialization)
  specialized_doctors: DoctorSpecialyEntity[];
}
