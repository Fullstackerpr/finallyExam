import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { State } from 'src/common/enums';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  appointment_type: string;

  @IsDateString()
  @IsNotEmpty()
  schedule_at: Date; 

  @IsEnum(State)
  @IsOptional()
  state: State; 
}
