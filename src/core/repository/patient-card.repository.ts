import { Repository } from 'typeorm';
import { PatientCardEntity } from '../entity/patient-card.entity';

export type PatientCardRepository = Repository<PatientCardEntity>;
