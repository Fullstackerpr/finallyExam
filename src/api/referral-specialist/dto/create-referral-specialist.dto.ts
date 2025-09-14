import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReferralSpecialistDto {
  @ApiProperty({
    example: 'doctor-123-456-789',
    description: 'Shifokor ID si',
  })
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({
    example: 'appointment-987-654-321',
    description: 'Uchrashuvning ID si',
  })
  @IsString()
  @IsNotEmpty()
  appointmentId: string;

  @ApiProperty({
    example: "Qo'shimcha kardiolog konsultatsiyasi kerak",
    description: "Yo'naltirish sababi",
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
