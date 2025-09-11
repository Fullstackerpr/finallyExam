import { Repository } from 'typeorm';
import { PatientEntity } from '../entity/patient.entity';

export type PatientRepository = Repository<PatientEntity>
