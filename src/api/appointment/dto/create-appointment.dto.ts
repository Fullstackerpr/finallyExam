import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { State } from 'src/common/enums';

export class CreateAppointmentDto {
  @ApiProperty({
    example: 'Konsultatsiya',
    description: 'Uchrashuvning turi',
  })
  @IsString()
  @IsNotEmpty()
  appointment_type: string;

  @ApiProperty({
    example: '2024-12-15T10:30:00Z',
    description: 'Uchrashuvning vaqti',
  })
  @IsNotEmpty()
  schedule_at: string;

  @ApiProperty({
    example: 'pending',
    enum: State,
    description: 'Uchrashuvning holati',
    required: false,
  })
  @IsEnum(State)
  @IsOptional()
  state: State;
}
