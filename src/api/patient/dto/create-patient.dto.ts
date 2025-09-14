import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Roles } from 'src/common/enums';

export class CreatePatientDto {
  @ApiProperty({
    example: 'Akmal',
    description: 'Bemorning ismi',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Karimov',
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
    example: '1990-05-15',
    description: "Tug'ilgan sanasi",
  })
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({
    example: 'akmal.karimov@example.com',
    description: 'Email manzili',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
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
