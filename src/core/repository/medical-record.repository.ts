import { Repository } from 'typeorm';
import { MedicalRecordEntity } from '../entity/medical-records';

export type MedicalRecordRepository = Repository<MedicalRecordEntity>;
