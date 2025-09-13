import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/core/entity/doctor.entity';
import { DoctorRepository } from 'src/core/repository/doctor.repository';
import { catchError, successRes } from 'src/infrastructure/response';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { Roles } from 'src/common/enums';
import { OtpGenerate } from 'src/infrastructure/otp';
import { MailService } from 'src/common/mail/mail.service';
import { OtpDto } from './dto/otp.dto';
import { Token } from 'src/infrastructure/generate-token';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtPayload } from 'src/common/utils/types/admin.type';
import { RegisterDoctorDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
// import { Response } from 'express';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepo: DoctorRepository,
    private readonly bcrypt: BcryptEncryption,
    private readonly otp: OtpGenerate,
    private readonly mail: MailService,
    private readonly token: Token,
  ) {}

  async register(registerDto: RegisterDoctorDto) {
    try {
      const existEmail = await this.doctorRepo.findOne({
        where: { email: registerDto.email },
      });

      if (existEmail) {
        throw new ConflictException('Email already exists');
      }

      const existPhoneNumber = await this.doctorRepo.findOne({
        where: { phone_number: registerDto.phone_number },
      });

      if (existPhoneNumber) {
        throw new ConflictException('Phone Number already exists');
      }

      const hashPassword = await this.bcrypt.encrypt(registerDto.password);
      let doctor = {
        ...registerDto,
        password: hashPassword,
        role: Roles.DOCTOR,
      };
      const doctors = this.doctorRepo.create(doctor);
      await this.doctorRepo.save(doctors);
      return successRes(doctors, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async login(loginDoctorDto: LoginDto) {
    try {
      const { email, password } = loginDoctorDto;

      const emailExist = await this.doctorRepo.findOne({ where: { email } });
      if (!emailExist) {
        throw new NotFoundException('Email not found');
      }

      const doctor = await this.doctorRepo.findOne({ where: { email } });
      if (!doctor) {
        throw new BadRequestException('Email or Password error');
      }

      const isMatch = await this.bcrypt.compare(password, emailExist?.password);
      if (!isMatch) {
        throw new BadRequestException('Email or Password error');
      }

      let otp = await this.otp.Generate(String(doctor.email));
      await this.mail.sendMail(
        doctor.email,
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

      const doctor = await this.doctorRepo.findOne({
        where: { email: data.email },
      });

      if (!doctor) {
        throw new NotFoundException('Email not found!');
      }

      const payload = { id: doctor.id, role: doctor.role };
      const token = await this.token.generateTokens(payload);

      return { message: 'successfully', ...token };
    } catch (error) {
      return catchError(error);
    }
  }

  // async SignOut(res: Response) {
  //   try {
  //     res.clearCookie('refresh_token')
  //     return successRes({}, 200, 'SignOut success!!')
  //   } catch (error) {
  //     return catchError(error)
  //   }
  // }

  async findAllDoctor() {
    try {
      const data = await this.doctorRepo.find();
      return successRes(data);
    } catch (error) {
      return catchError(error);
    }
  }

  async findByIdDoctor(id: string) {
    try {
      const doctor = await this.doctorRepo.findOne({ where: { id } });
      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }
      return successRes(doctor);
    } catch (error) {
      return catchError(error);
    }
  }

  async profile(doctor: JwtPayload) {
    try {
      const { id } = doctor;
      const profile = await this.doctorRepo.findOne({ where: { id } });
      return successRes(profile);
    } catch (error) {
      return catchError(error);
    }
  }

  async updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto) {
    try {
      const { email, phone_number } = updateDoctorDto;

      const doctor = await this.doctorRepo.findOne({ where: { id } });
      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }

      const existEmail = await this.doctorRepo.findOne({ where: { email } });
      if (existEmail) {
        throw new ConflictException('Email already exists');
      }

      const existPhoneNumber = await this.doctorRepo.findOne({
        where: { phone_number },
      });
      if (existPhoneNumber) {
        throw new ConflictException('Phone Number already exists');
      }

      if (updateDoctorDto.role) {
        throw new ForbiddenException('Siz role ni ozgartira olmaysiz');
      }

      if (updateDoctorDto.gender) {
        throw new ForbiddenException('Siz genderni ozgartira olmaysiz');
      }

      await this.doctorRepo.update(id, updateDoctorDto);

      const updatedDoctor = await this.doctorRepo.findOne({ where: { id } });
      return successRes(updatedDoctor);
    } catch (error) {
      return catchError(error);
    }
  }

  async deleteDoctor(id: string) {
    try {
      const doctor = await this.doctorRepo.findOne({ where: { id } });
      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }

      await this.doctorRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
