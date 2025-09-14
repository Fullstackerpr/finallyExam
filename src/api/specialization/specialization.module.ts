import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationEntity } from 'src/core/entity/specialization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpecializationEntity])],
  controllers: [SpecializationController],
  providers: [SpecializationService],
})
export class SpecializationModule {}
