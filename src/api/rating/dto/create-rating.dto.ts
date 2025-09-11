import { IsInt, IsString, Max, Min, IsOptional } from 'class-validator';

export class CreateRatingDto {
  // @IsString()
  // patient_id: string;

  // @IsString()
  // doctor_id: string;

  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
