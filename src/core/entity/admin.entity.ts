import { BaseEntity } from 'src/common/database/BaseEntity';
import { Roles, Status } from 'src/common/enums';
import { Column, Entity } from 'typeorm';

@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;
}
