import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Gender, Roles } from 'src/common/enums';

export class CreateDoctorDto {
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
  birthday: string;

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
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;

  @IsOptional()
  @IsString()
  walletId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scheduleId?: string[];
}
