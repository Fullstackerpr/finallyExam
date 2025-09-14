import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorSpecialyService } from './doctor-specialy.service';
import { CreateDoctorSpecialyDto } from './dto/create-doctor-specialy.dto';
import { UpdateDoctorSpecialyDto } from './dto/update-doctor-specialy.dto';

@Controller('doctor-specialy')
export class DoctorSpecialyController {
  constructor(private readonly doctorSpecialyService: DoctorSpecialyService) {}

  @Post()
  create(@Body() createDoctorSpecialyDto: CreateDoctorSpecialyDto) {
    return this.doctorSpecialyService.create(createDoctorSpecialyDto);
  }

  @Get()
  findAll() {
    return this.doctorSpecialyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorSpecialyService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorSpecialyService.remove(id);
  }
}
