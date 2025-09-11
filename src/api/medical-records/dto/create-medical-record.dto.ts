import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
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

  @IsDateString()
  start_at: Date;

  @IsDateString()
  @IsOptional()
  finished_at?: Date;

  @IsEnum(StatusMedic)
  status: StatusMedic;
}
