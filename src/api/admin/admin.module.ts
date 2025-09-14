import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity } from 'src/core/entity/admin.entity';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { Token } from 'src/infrastructure/generate-token';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), JwtModule.register({})],
  controllers: [AdminController],
  providers: [AdminService, BcryptEncryption, Token],
})
export class AdminModule {}
