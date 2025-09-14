import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Roles, Status } from 'src/common/enums';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;
}
