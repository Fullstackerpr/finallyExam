import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Roles } from 'src/common/enums';

export class RegisterPatientDto {
  @ApiProperty({
    example: 'Dilshod',
    description: 'Bemorning ismi',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Umarov',
    description: 'Bemorning familiyasi',
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
    example: '1992-08-25',
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
    example: 'patient',
    enum: Roles,
    description: 'Foydalanuvchi roli',
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
