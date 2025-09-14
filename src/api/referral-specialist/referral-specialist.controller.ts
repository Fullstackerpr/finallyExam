import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateReferralSpecialistDto } from './dto/create-referral-specialist.dto';
import { UpdateReferralSpecialistDto } from './dto/update-referral-specialist.dto';
import { ReferralSpecialistService } from './referral-specialist.service';

@Controller('referral-specialist')
export class ReferralSpecialistController {
  constructor(
    private readonly referralSpecialistService: ReferralSpecialistService,
  ) {}

  @Post()
  create(@Body() createReferralSpecialistDto: CreateReferralSpecialistDto) {
    return this.referralSpecialistService.create(createReferralSpecialistDto);
  }

  @Get()
  findAll() {
    return this.referralSpecialistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referralSpecialistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReferralSpecialistDto: UpdateReferralSpecialistDto,
  ) {
    return this.referralSpecialistService.update(
      id,
      updateReferralSpecialistDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referralSpecialistService.remove(id);
  }
}
