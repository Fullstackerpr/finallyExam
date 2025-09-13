import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  otp: number
}
