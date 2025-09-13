import { BaseEntity } from 'src/common/database/BaseEntity';
import { Status } from 'src/common/enums';
import { Column, Entity } from 'typeorm';

@Entity()
export class PatientCardEntity extends BaseEntity {
  //   @Column({ type: 'string' })
  //   doctor_id: string;

  @Column({ type: 'varchar' })
  card_type: string;

  @Column({ type: 'varchar', unique: true })
  card_number: string;

  @Column({ type: 'smallint'})
  expire_month: number;

  @Column({ type: 'int' })
  expire_year: number;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;
}
