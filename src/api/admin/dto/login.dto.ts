import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'Hucker',
    description: 'Foydalanuvchi nomi',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: '5567',
    description: 'Parol (kamida 3 ta belgi)',
  })
  @IsString()
  @MinLength(3)
  password: string;
}
