import { Module } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { ServiceTypeController } from './service-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceTypeEntity } from 'src/core/entity/service-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceTypeEntity])],
  controllers: [ServiceTypeController],
  providers: [ServiceTypeService],
})
export class ServiceTypeModule {}
