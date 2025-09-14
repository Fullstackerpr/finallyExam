import { Repository } from 'typeorm';
import { ServiceTypeEntity } from '../entity/service-type.entity';

export type ServiceTypeRepository = Repository<ServiceTypeEntity>;
