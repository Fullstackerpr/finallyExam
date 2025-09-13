import { Injectable } from '@nestjs/common';
import { CreateDoctorWalletDto } from './dto/create-doctor-wallet.dto';
import { UpdateDoctorWalletDto } from './dto/update-doctor-wallet.dto';

@Injectable()
export class DoctorWalletService {
  create(createDoctorWalletDto: CreateDoctorWalletDto) {
    return 'This action adds a new doctorWallet';
  }

  findAll() {
    return `This action returns all doctorWallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorWallet`;
  }

  update(id: number, updateDoctorWalletDto: UpdateDoctorWalletDto) {
    return `This action updates a #${id} doctorWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorWallet`;
  }
}
