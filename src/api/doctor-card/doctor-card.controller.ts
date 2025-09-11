import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorCardService } from './doctor-card.service';
import { CreateDoctorCardDto } from './dto/create-doctor-card.dto';
import { UpdateDoctorCardDto } from './dto/update-doctor-card.dto';

@Controller('doctor-card')
export class DoctorCardController {
  constructor(private readonly doctorCardService: DoctorCardService) {}

  @Post()
  create(@Body() createDoctorCardDto: CreateDoctorCardDto) {
    return this.doctorCardService.createDoctorCard(createDoctorCardDto);
  }

  @Get()
  findAll() {
    return this.doctorCardService.getAllDoctorCard();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorCardService.getByIdDoctorCard(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorCardDto: UpdateDoctorCardDto,
  ) {
    return this.doctorCardService.updateDoctorCard(id, updateDoctorCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorCardService.deleteDoctorCard(id);
  }
}
