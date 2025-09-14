import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorWalletEntity } from 'src/core/entity/doctor-wallet.entity';
import { DoctorWalletRepository } from 'src/core/repository/doctor-wallet.repository';
import { catchError, successRes } from 'src/infrastructure/response';
import { CreateDoctorWalletDto } from './dto/create-doctor-wallet.dto';
import { UpdateDoctorWalletDto } from './dto/update-doctor-wallet.dto';
import { DoctorEntity } from 'src/core/entity/doctor.entity';

@Injectable()
export class DoctorWalletService {
  constructor(
    @InjectRepository(DoctorWalletEntity)
    private readonly walletRepo: DoctorWalletRepository,
  ) {}

  async createWallet(dto: CreateDoctorWalletDto) {
    try {
      const existWallet = await this.walletRepo.findOne({
        where: { doctor: { id: dto.doctor_id } },
      });

      if (existWallet) {
        throw new ConflictException('This doctor already has a wallet');
      }

      const wallet = this.walletRepo.create({
        balance: dto.balance,
        doctor: { id: dto.doctor_id } as DoctorEntity,
      });

      await this.walletRepo.save(wallet);
      return successRes(wallet, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAllWallets() {
    try {
      const wallets = await this.walletRepo.find({ relations: ['doctor'] });
      return successRes(wallets);
    } catch (error) {
      return catchError(error);
    }
  }

  async findWalletByDoctor(doctorId: string) {
    try {
      const wallet = await this.walletRepo.findOne({
        where: { doctor: { id: doctorId } },
        relations: ['doctor'],
      });

      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }
      return successRes(wallet);
    } catch (error) {
      return catchError(error);
    }
  }

  async updateWallet(doctorId: string, dto: UpdateDoctorWalletDto) {
    try {
      const wallet = await this.walletRepo.findOne({
        where: { doctor: { id: doctorId } },
      });

      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      if (dto.balance !== undefined) {
        if (wallet.balance + dto.balance < 0) {
          throw new BadRequestException('Insufficient balance');
        }
        wallet.balance += dto.balance;
      }

      await this.walletRepo.save(wallet);
      return successRes(wallet);
    } catch (error) {
      return catchError(error);
    }
  }

  async deleteWallet(doctorId: string) {
    try {
      const wallet = await this.walletRepo.findOne({
        where: { doctor: { id: doctorId } },
      });

      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      await this.walletRepo.delete(wallet.id);
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
