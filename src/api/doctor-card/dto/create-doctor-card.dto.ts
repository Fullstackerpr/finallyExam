import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';
import { Status } from 'src/common/enums';

export class CreateDoctorCardDto {
  @IsNotEmpty()
  @IsString()
  card_type: string;

  @IsNotEmpty()
  @IsString()
  card_number: string;

  @IsNotEmpty()
  @IsNumber()
  expire_month: number;

  @IsNotEmpty()
  @IsNumber()
  expire_year: number;

  @IsEnum(Status)
  status: Status;
}
