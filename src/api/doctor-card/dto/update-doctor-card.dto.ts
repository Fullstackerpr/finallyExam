import { PartialType } from '@nestjs/swagger';
import { CreateDoctorCardDto } from './create-doctor-card.dto';

export class UpdateDoctorCardDto extends PartialType(CreateDoctorCardDto) {}
