import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Roles } from 'src/common/enums';

export class RegisterDoctorDto {
  @ApiProperty({
    example: 'Dr. Aziz',
    description: 'Shifokorning ismi',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Karimov',
    description: 'Shifokorning familiyasi',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Telefon raqami',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: '1980-05-15',
    description: "Tug'ilgan sanasi",
  })
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    example: 'bahodirnabijanov782@gmail.com',
    description: 'Email manzili',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234',
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
    example: '8 yil',
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
}
