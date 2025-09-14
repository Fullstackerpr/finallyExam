import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecializationDto {
  @ApiProperty({
    example: 'Kardiologiya',
    description: 'Mutaxassislik nomi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
