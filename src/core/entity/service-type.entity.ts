import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ServiceEntity } from './service.entity';

@Entity('service-type')
export class ServiceTypeEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => ServiceEntity, (service) => service.serviceType)
  services: ServiceEntity[];
}
