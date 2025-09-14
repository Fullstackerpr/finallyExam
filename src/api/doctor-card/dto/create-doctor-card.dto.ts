import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/common/enums';

export class CreateDoctorCardDto {
  @ApiProperty({
    example: 'Visa',
    description: 'Shifokor karta turi',
  })
  @IsNotEmpty()
  @IsString()
  card_type: string;

  @ApiProperty({
    example: '4111111111111111',
    description: 'Shifokor karta raqami',
  })
  @IsNotEmpty()
  @IsString()
  card_number: string;

  @ApiProperty({
    example: 12,
    description: 'Kartaning amal qilish oyi',
  })
  @IsNotEmpty()
  @IsNumber()
  expire_month: number;

  @ApiProperty({
    example: 2026,
    description: 'Kartaning amal qilish yili',
  })
  @IsNotEmpty()
  @IsNumber()
  expire_year: number;

  @ApiProperty({
    example: 'active',
    enum: Status,
    description: 'Karta holati',
  })
  @IsEnum(Status)
  status: Status;
}
