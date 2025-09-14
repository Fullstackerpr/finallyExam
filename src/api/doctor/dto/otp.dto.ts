import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpDto {
  @ApiProperty({
    example: 'bahodirnabijanov782@gmail.com',
    description: 'Shifokor email manzili',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 123456,
    description: 'OTP kod (6 raqamli)',
  })
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
