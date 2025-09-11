import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SpecailizationEntity extends BaseEntity {
  @Column({ type: 'varchar'})
  name: string;
}
