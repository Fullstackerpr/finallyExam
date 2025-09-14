import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorWalletDto {
  @ApiProperty({
    example: 500000,
    description: "Hamyon balansi (so'mda)",
  })
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @ApiProperty({
    example: 'doctor-123-456-789',
    description: 'Shifokor ID si',
  })
  @IsNotEmpty()
  @IsString()
  doctor_id: string;
}
