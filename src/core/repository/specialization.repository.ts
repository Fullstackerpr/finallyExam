import { Repository } from 'typeorm';
import { SpecializationEntity } from '../entity/specialization.entity';

export type SpecailizationRepository = Repository<SpecializationEntity>;
