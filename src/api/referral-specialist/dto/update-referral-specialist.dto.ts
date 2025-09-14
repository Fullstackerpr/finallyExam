import { PartialType } from '@nestjs/swagger';
import { CreateReferralSpecialistDto } from './create-referral-specialist.dto';

export class UpdateReferralSpecialistDto extends PartialType(
  CreateReferralSpecialistDto,
) {}
