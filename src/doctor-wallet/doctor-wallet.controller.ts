import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorWalletService } from './doctor-wallet.service';
import { CreateDoctorWalletDto } from './dto/create-doctor-wallet.dto';
import { UpdateDoctorWalletDto } from './dto/update-doctor-wallet.dto';

@Controller('doctor-wallet')
export class DoctorWalletController {
  constructor(private readonly doctorWalletService: DoctorWalletService) {}

  @Post()
  create(@Body() createDoctorWalletDto: CreateDoctorWalletDto) {
    return this.doctorWalletService.create(createDoctorWalletDto);
  }

  @Get()
  findAll() {
    return this.doctorWalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorWalletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorWalletDto: UpdateDoctorWalletDto) {
    return this.doctorWalletService.update(+id, updateDoctorWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorWalletService.remove(+id);
  }
}
