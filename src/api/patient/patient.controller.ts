import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { RegisterPatientDto } from './dto/register.dto';
import { LoginDto } from '../doctor/dto/login.dto';
import { OtpDto } from '../doctor/dto/otp.dto';
import { AcceptRoles } from 'src/common/decorator/role.decorator';
import { JwtGuard } from 'src/common/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { SelfGuard } from 'src/common/guards/self.guard';
import { Roles } from 'src/common/enums';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('register')
  register(@Body() registerDto: RegisterPatientDto) {
    return this.patientService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.patientService.login(loginDto);
  }

  @Post('verify')
  verifyOtp(@Body() otpDto: OtpDto) {
    return this.patientService.verifyOtp(otpDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAllPatient();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.patientService.findByIdPatient(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Req() req: Request,
  ) {
    return this.patientService.updatePatient(id, updatePatientDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.patientService.deletePatient(id);
  }
}
