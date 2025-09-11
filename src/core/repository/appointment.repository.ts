import { Repository } from "typeorm";
import { AppointmentEntity } from "../entity/appointment.entity";


export type AppointmentRepository = Repository<AppointmentEntity>