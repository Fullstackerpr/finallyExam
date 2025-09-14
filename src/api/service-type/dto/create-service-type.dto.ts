import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceTypeDto {
  @ApiProperty({
    example: 'Diagnostika',
    description: 'Xizmat turi nomi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Tibbiy diagnostika xizmatlari',
    description: 'Xizmat turi tavsifi',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
