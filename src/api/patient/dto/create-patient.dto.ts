import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';
import { Gender, Roles } from 'src/common/enums';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
