import { PartialType } from '@nestjs/swagger';
import { CreatePatientCardDto } from './create-patient-card.dto';

export class UpdatePatientCardDto extends PartialType(CreatePatientCardDto) {}
