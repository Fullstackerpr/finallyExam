import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from 'src/core/entity/patient.entity';
import { JwtModule } from '@nestjs/jwt';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { Token } from 'src/infrastructure/generate-token';
import { OtpGenerate } from 'src/infrastructure/otp';
import { MailService } from 'src/common/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService, BcryptEncryption, Token, OtpGenerate, MailService],
})
export class PatientModule {}
