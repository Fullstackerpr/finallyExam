import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Roles } from 'src/common/enums';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'Dr. Sardor',
    description: 'Shifokorning ismi',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Abdullayev',
    description: 'Shifokorning familiyasi',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '+998901234568',
    description: 'Telefon raqami',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: '1985-03-20',
    description: "Tug'ilgan sanasi",
  })
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    example: 'sardor.doctor@example.com',
    description: 'Email manzili',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'DoctorPass123!',
    description: 'Parol',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'male',
    enum: Gender,
    description: 'Jinsi',
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: '5 yil',
    description: 'Ish tajribasi',
  })
  @IsNotEmpty()
  @IsString()
  experience: string;

  @ApiProperty({
    example: 'doctor',
    enum: Roles,
    description: 'Foydalanuvchi roli',
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;

  @ApiProperty({
    example: 'wallet-123-456',
    description: 'Hamyon ID (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  @IsString()
  walletId?: string;

  @ApiProperty({
    example: ['schedule-1', 'schedule-2'],
    description: 'Jadval ID lari (ixtiyoriy)',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scheduleId?: string[];
}
