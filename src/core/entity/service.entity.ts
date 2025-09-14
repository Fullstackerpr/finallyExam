import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceTypeEntity } from './service-type.entity';

@Entity('service')
export class ServiceEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  doctor_id: string;

  @Column({ type: 'varchar' })
  service_type_id: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => ServiceTypeEntity, (serviceType) => serviceType.services, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_type_id' })
  serviceType: ServiceTypeEntity;
}
