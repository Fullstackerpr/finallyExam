import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles, Status } from 'src/common/enums';

export class CreateAdminDto {
  @ApiProperty({
    example: 'Bobur Rahimov',
    description: "Adminning to'liq ismi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'admin_bobur',
    description: 'Foydalanuvchi nomi',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'AdminPass123!',
    description: 'Parol (kamida 4 belgi)',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Telefon raqami',
  })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    example: 'active',
    enum: Status,
    description: 'Admin holati (ixtiyoriy)',
    required: false,
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({
    example: 'admin',
    enum: Roles,
    description: 'Foydalanuvchi roli (ixtiyoriy)',
    required: false,
  })
  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;
}
