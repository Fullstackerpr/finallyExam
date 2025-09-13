import { Module } from '@nestjs/common';
import { DoctorWalletService } from './doctor-wallet.service';
import { DoctorWalletController } from './doctor-wallet.controller';

@Module({
  controllers: [DoctorWalletController],
  providers: [DoctorWalletService],
})
export class DoctorWalletModule {}
