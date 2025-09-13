import { PartialType } from '@nestjs/swagger';
import { CreateDoctorWalletDto } from './create-doctor-wallet.dto';

export class UpdateDoctorWalletDto extends PartialType(CreateDoctorWalletDto) {}
