import { PartialType } from '@nestjs/swagger';
import { CreateDoctorSpecialyDto } from './create-doctor-specialy.dto';

export class UpdateDoctorSpecialyDto extends PartialType(
  CreateDoctorSpecialyDto,
) {}
