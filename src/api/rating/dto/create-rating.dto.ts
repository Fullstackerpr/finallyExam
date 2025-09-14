import { IsInt, IsString, Max, Min, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({
    example: '',
    description: 'Doctor ID si',
  })
  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @ApiProperty({
    example: '',
    description: 'Patient ID si',
  })
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @ApiProperty({
    example: 5,
    minimum: 1,
    maximum: 5,
    description: 'Baholash (1 dan 5 gacha)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @ApiProperty({
    example: 'Juda yaxshi shifokor, professional yondashuv',
    description: 'Izoh (ixtiyoriy)',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
