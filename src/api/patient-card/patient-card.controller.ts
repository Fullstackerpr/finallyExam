import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientCardService } from './patient-card.service';
import { CreatePatientCardDto } from './dto/create-patient-card.dto';
import { UpdatePatientCardDto } from './dto/update-patient-card.dto';

@Controller('patient-card')
export class PatientCardController {
  constructor(private readonly patientCardService: PatientCardService) {}

  @Post()
  create(@Body() createPatientCardDto: CreatePatientCardDto) {
    return this.patientCardService.createPatientCard(createPatientCardDto);
  }

  @Get()
  findAll() {
    return this.patientCardService.getAllDoctorCard();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientCardService.getByIdPatientCard(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientCardDto: UpdatePatientCardDto) {
    return this.patientCardService.updatePatientCard(id, updatePatientCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientCardService.deletePatientCard(id);
  }
}
