import { Repository } from 'typeorm';
import { DoctorCardEntity } from '../entity/doctor-card.entity';

export type DoctorCardRepository = Repository<DoctorCardEntity>;
