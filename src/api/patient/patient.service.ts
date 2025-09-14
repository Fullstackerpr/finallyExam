import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/common/enums';
import { MailService } from 'src/common/mail/mail.service';
import { PatientEntity } from 'src/core/entity/patient.entity';
import { PatientRepository } from 'src/core/repository/patient.repository';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { Token } from 'src/infrastructure/generate-token';
import { OtpGenerate } from 'src/infrastructure/otp';
import { catchError, successRes } from 'src/infrastructure/response';
import { RegisterPatientDto } from './dto/register.dto';
import { LoginDto } from '../doctor/dto/login.dto';
import { OtpDto } from '../doctor/dto/otp.dto';
import { JwtPayload } from 'src/common/utils/types/admin.type';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepo: PatientRepository,
    private readonly bcrypt: BcryptEncryption,
    private readonly otp: OtpGenerate,
    private readonly mail: MailService,
    private readonly token: Token,
  ) {}

  async register(registerDto: RegisterPatientDto) {
    try {
      const existEmail = await this.patientRepo.findOne({
        where: { email: registerDto.email },
      });

      if (existEmail) {
        throw new ConflictException('Email already exists');
      }

      const existPhoneNumber = await this.patientRepo.findOne({
        where: { phone_number: registerDto.phone_number },
      });

      if (existPhoneNumber) {
        throw new ConflictException('Phone Number already exists');
      }

      const hashPassword = await this.bcrypt.encrypt(registerDto.password);
      let patient = {
        ...registerDto,
        password: hashPassword,
        role: Roles.PATIENT,
      };
      const patients = this.patientRepo.create(patient);
      await this.patientRepo.save(patients);
      return successRes(patients, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async login(loginPatientDto: LoginDto) {
    try {
      const { email, password } = loginPatientDto;

      const emailExist = await this.patientRepo.findOne({ where: { email } });
      if (!emailExist) {
        throw new NotFoundException('Email not found');
      }

      const patient = await this.patientRepo.findOne({ where: { email } });
      if (!patient) {
        throw new BadRequestException('Email or Password error');
      }

      const isMatch = await this.bcrypt.compare(password, emailExist?.password);
      if (!isMatch) {
        throw new BadRequestException('Email or Password error');
      }

      let otp = await this.otp.Generate(String(patient.email));
      await this.mail.sendMail(
        patient.email,
        `Royxatdan otish muvaffaqiyatli kod: ${otp}`,
      );

      return { message: `Tasdiqlash kod yuborildi!` };
    } catch (error) {
      return catchError(error);
    }
  }

  async verifyOtp(data: OtpDto) {
    try {
      const otp = await this.otp.verify(String(data.email), data.otp);

      if (!otp) {
        throw new UnprocessableEntityException('Wrong or expired OTP');
      }

      const patient = await this.patientRepo.findOne({
        where: { email: data.email },
      });

      if (!patient) {
        throw new NotFoundException('Email not found!');
      }

      const payload = { id: patient.id, role: patient.role };
      const token = await this.token.generateTokens(payload);

      return { message: 'successfully', ...token };
    } catch (error) {
      return catchError(error);
    }
  }

  async findAllPatient() {
    try {
      const data = await this.patientRepo.find();
      return successRes(data);
    } catch (error) {
      return catchError(error);
    }
  }

  async findByIdPatient(id: string) {
    try {
      const patient = await this.patientRepo.findOne({ where: { id } });
      if (!patient) {
        throw new NotFoundException('Patient not found');
      }
      return successRes(patient);
    } catch (error) {
      return catchError(error);
    }
  }

  async profile(patient: JwtPayload) {
    try {
      const { id } = patient;
      const profile = await this.patientRepo.findOne({ where: { id } });
      return successRes(profile);
    } catch (error) {
      return catchError(error);
    }
  }

  async updatePatient(id: string, updatepatientDto: UpdatePatientDto) {
    try {
      const { email, phone_number } = updatepatientDto;

      const patient = await this.patientRepo.findOne({ where: { id } });
      if (!patient) {
        throw new NotFoundException('Patient not found');
      }

      const existEmail = await this.patientRepo.findOne({ where: { email } });
      if (existEmail) {
        throw new ConflictException('Email already exists');
      }

      const existPhoneNumber = await this.patientRepo.findOne({
        where: { phone_number },
      });
      if (existPhoneNumber) {
        throw new ConflictException('Phone Number already exists');
      }

      if (updatepatientDto.role) {
        throw new ForbiddenException('Siz role ni ozgartira olmaysiz');
      }

      if (updatepatientDto.gender) {
        throw new ForbiddenException('Siz genderni ozgartira olmaysiz');
      }

      await this.patientRepo.update(id, updatepatientDto);

      const updatedPatient = await this.patientRepo.findOne({ where: { id } });
      return successRes(updatedPatient);
    } catch (error) {
      return catchError(error);
    }
  }

  async deletePatient(id: string) {
    try {
      const patient = await this.patientRepo.findOne({ where: { id } });
      if (!patient) {
        throw new NotFoundException('Patient not found');
      }

      await this.patientRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
