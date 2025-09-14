import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDoctorWalletDto {
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsNotEmpty()
  @IsString()
  doctor_id: string;
}
