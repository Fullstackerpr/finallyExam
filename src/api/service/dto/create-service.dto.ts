import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Konsultatsiya',
    description: 'Xizmat nomi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Umumiy shifokor konsultatsiyasi',
    description: 'Xizmat tavsifi',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 150000,
    description: "Xizmat narxi (so'mda)",
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
