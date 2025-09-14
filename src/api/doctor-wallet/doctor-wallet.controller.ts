import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorWalletService } from './doctor-wallet.service';
import { CreateDoctorWalletDto } from './dto/create-doctor-wallet.dto';
import { UpdateDoctorWalletDto } from './dto/update-doctor-wallet.dto';

@Controller('doctor-wallet')
export class DoctorWalletController {
  constructor(private readonly doctorWalletService: DoctorWalletService) {}

  @Post()
  create(@Body() createDoctorWalletDto: CreateDoctorWalletDto) {
    return this.doctorWalletService.createWallet(createDoctorWalletDto);
  }

  @Get()
  findAll() {
    return this.doctorWalletService.findAllWallets();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorWalletService.findWalletByDoctor(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorWalletDto: UpdateDoctorWalletDto,
  ) {
    return this.doctorWalletService.updateWallet(id, updateDoctorWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorWalletService.deleteWallet(id);
  }
}
