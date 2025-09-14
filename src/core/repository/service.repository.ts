import { Repository } from 'typeorm';
import { ServiceEntity } from '../entity/service.entity';

export type ServiceRepository = Repository<ServiceEntity>;
