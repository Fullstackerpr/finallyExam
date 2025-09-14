import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDoctorSpecialyDto {
  @IsUUID()
  @IsNotEmpty()
  readonly doctor_id: string;

  @IsUUID()
  @IsNotEmpty()
  readonly specialization_id: string;
}
