import { BaseEntity } from 'src/common/database/BaseEntity';
import { Gender, Roles } from 'src/common/enums';
import { Column, Entity } from 'typeorm';

@Entity('doctor')
export class DoctorEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'timestamp' })
  birthday: Date;
  
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({type: 'varchar'})
  password: string

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'varchar' })
  experience: string;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;
}
