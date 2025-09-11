import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
