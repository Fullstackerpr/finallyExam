import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { StatusMedic } from 'src/common/enums';

export class CreateMedicalRecordDto {
  @IsString()
  complaint: string;

  @IsString()
  anamnesis: string;

  @IsString()
  medical_check: string;

  @IsString()
  diagnosis: string;

  @IsString()
  treatment: string;

  @IsNotEmpty()
  start_at: string;

  @IsOptional()
  finished_at?: string;

  @IsEnum(StatusMedic)
  status: StatusMedic;
}
