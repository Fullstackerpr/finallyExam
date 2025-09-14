import { Module } from '@nestjs/common';
import { DoctorWalletService } from './doctor-wallet.service';
import { DoctorWalletController } from './doctor-wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorWalletEntity } from 'src/core/entity/doctor-wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorWalletEntity])],
  controllers: [DoctorWalletController],
  providers: [DoctorWalletService],
})
export class DoctorWalletModule {}
