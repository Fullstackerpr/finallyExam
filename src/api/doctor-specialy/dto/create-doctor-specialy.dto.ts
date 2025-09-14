import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorSpecialyDto {
  @ApiProperty({
    example: '',
    description: 'Shifokor ID si',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly doctor_id: string;

  @ApiProperty({
    example: '',
    description: 'Mutaxassislik ID si',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly specialization_id: string;
}
