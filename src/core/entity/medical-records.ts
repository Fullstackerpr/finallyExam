import { BaseEntity } from "src/common/database/BaseEntity";
import { StatusMedic } from "src/common/enums";
import { Column, Entity } from "typeorm";


@Entity()
export class MedicalRecordEntity extends BaseEntity {
    // @Column({type: 'varchar'})
    // appointment_id: string

    // @Column({type: 'varchar'})
    // patient_id: string

    // @Column({type: 'varchar'})
    // doctor_id: string

    @Column({type: 'varchar'})
    complaint: string

    @Column({type: 'varchar'})
    anamnesis: string

    @Column({type: 'varchar'})
    medical_check: string

    @Column({type: 'varchar'})
    diagnosis: string

    @Column({type: 'varchar'})
    treatment: string

    @Column({type: 'date'})
    start_at: Date

    @Column({type: 'date'})
    finished_at: Date

    @Column({type: 'enum', enum: StatusMedic})
    status: StatusMedic
}