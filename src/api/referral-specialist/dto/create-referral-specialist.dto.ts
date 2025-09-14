import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReferralSpecialistDto {
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  appointmentId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
