import { Repository } from 'typeorm';
import { DoctorEntity } from '../entity/doctor.entity';

export type DoctorRepository = Repository<DoctorEntity>
