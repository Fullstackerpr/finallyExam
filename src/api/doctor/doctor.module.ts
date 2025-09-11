import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/core/entity/doctor.entity';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { Token } from 'src/infrastructure/generate-token';
import { OtpGenerate } from 'src/infrastructure/otp';
import { MailService } from 'src/common/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',  
      signOptions: { expiresIn: '1d' },             
    }),
  ],
  controllers: [DoctorController],
  providers: [DoctorService, BcryptEncryption, Token, OtpGenerate, MailService],
})
export class DoctorModule {}
