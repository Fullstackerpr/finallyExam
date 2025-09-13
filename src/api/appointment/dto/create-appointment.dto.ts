import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { State } from 'src/common/enums';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  appointment_type: string;

  @IsNotEmpty()
  schedule_at: string; 

  @IsEnum(State)
  @IsOptional()
  state: State; 
}
