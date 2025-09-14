import { Repository } from 'typeorm';
import { DoctorSpecialyEntity } from '../entity/doctor-specilay.entity';

export type DoctorSpecialRepository = Repository<DoctorSpecialyEntity>;
