import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';
import { Status } from 'src/common/enums';

export class CreatePatientCardDto {
  @IsNotEmpty()
  @IsString()
  card_type: string;

  @IsNotEmpty()
  @IsString()
  card_number: string;

  @IsNotEmpty()
  @IsString()
  expire_month: number;

  @IsNotEmpty()
  @IsDateString()
  expire_year: number;

  @IsEmail()
  @IsEnum(Status)
  status: Status;
}
