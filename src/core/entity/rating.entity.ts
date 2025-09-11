import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class RatingEntity extends BaseEntity {
  //   @Column({ type: 'varchar' })
  //   patient_id: string;

  //   @Column({ type: 'varchar' })
  //   doctor_id: string;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'varchar' })
  comment: string;
}
