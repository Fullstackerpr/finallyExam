import { BaseEntity } from 'src/common/database/BaseEntity';
import { State } from 'src/common/enums';
import { Column, Entity } from 'typeorm';

@Entity()
export class AppointmentEntity extends BaseEntity {
//   @Column({ type: 'varchar' })
//   patient_id: string;

//   @Column({ type: 'varchar' })
//   doctor_id: string;

    @Column({type: 'varchar'})
    appointment_type: string

    @Column({type: 'date', unique: true})
    schedule_at: Date

    @Column({type: 'enum', enum: State, default: State.PENDING})
    state: State
}
