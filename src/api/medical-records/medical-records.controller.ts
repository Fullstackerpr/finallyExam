import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.createMedicalRecord(
      createMedicalRecordDto,
    );
  }

  @Get()
  findAll() {
    return this.medicalRecordsService.getAllMedicalRecords();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.getByIdMedicalRecord(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.updateMedicalRecord(
      id,
      updateMedicalRecordDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRecordsService.deleteMedicalRecord(id);
  }
}
