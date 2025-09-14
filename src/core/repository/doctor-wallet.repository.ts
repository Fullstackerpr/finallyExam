import { Repository } from 'typeorm';
import { DoctorWalletEntity } from '../entity/doctor-wallet.entity';

export type DoctorWalletRepository = Repository<DoctorWalletEntity>;
