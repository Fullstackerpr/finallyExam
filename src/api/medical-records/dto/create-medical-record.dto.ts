import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusMedic } from 'src/common/enums';

export class CreateMedicalRecordDto {
  @ApiProperty({
    example: "Bosh og'rig'i va isitma",
    description: 'Bemorning shikoyati',
  })
  @IsString()
  complaint: string;

  @ApiProperty({
    example: "3 kundan beri bosh og'rig'i, kechqurun isitma ko'tariladi",
    description: 'Kasallik tarixi',
  })
  @IsString()
  anamnesis: string;

  @ApiProperty({
    example: 'Qon bosimi: 120/80, Harorat: 37.5°C, Yurak urishi: 72/min',
    description: "Tibbiy ko'rik natijalari",
  })
  @IsString()
  medical_check: string;

  @ApiProperty({
    example: "ARVI (Yuqori nafas yo'llari viral infeksiyasi)",
    description: 'Tashxis',
  })
  @IsString()
  diagnosis: string;

  @ApiProperty({
    example: "Paratsetamol 500mg kuniga 3 marta, ko'p suyuqlik ichish",
    description: 'Davolash rejasi',
  })
  @IsString()
  treatment: string;

  @ApiProperty({
    example: '2024-12-15T09:00:00Z',
    description: 'Davolash boshlanish vaqti',
  })
  @IsNotEmpty()
  start_at: string;

  @ApiProperty({
    example: '2024-12-20T09:00:00Z',
    description: 'Davolash tugash vaqti (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  finished_at?: string;

  @ApiProperty({
    example: 'progress',
    enum: StatusMedic,
    description: 'Davolash holati',
  })
  @IsEnum(StatusMedic)
  status: StatusMedic;
}
