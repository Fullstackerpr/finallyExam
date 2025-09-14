import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorScheduleDto {
  @ApiProperty({
    example: '',
    description: 'Shifokor ID si',
  })
  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @ApiProperty({
    example: '2024-12-15',
    description: 'Ish kuni sanasi',
  })
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: '09:00',
    description: 'Ish boshlanish vaqti',
  })
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @ApiProperty({
    example: '17:00',
    description: 'Ish tugash vaqti',
  })
  @IsNotEmpty()
  @IsString()
  endTime: string;
}
