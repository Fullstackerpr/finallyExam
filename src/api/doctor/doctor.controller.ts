import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { RegisterDoctorDto } from './dto/register.dto';
import { OtpDto } from './dto/otp.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtGuard } from 'src/common/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { SelfGuard } from 'src/common/guards/self.guard';
import { AcceptRoles } from 'src/common/decorator/role.decorator';
import { Roles } from 'src/common/enums';
import { LoginDto } from './dto/login.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDoctorDto) {
    return this.doctorService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDoctorDto: LoginDto) {
    return this.doctorService.login(loginDoctorDto);
  }

  @Post('verify')
  verifyOtp(@Body() otpDto: OtpDto) {
    return this.doctorService.verifyOtp(otpDto);
  }

  @Get()
  findAll() {
    return this.doctorService.findAllDoctor();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.doctorService.findByIdDoctor(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Req() req: Request,
  ) {
    return this.doctorService.updateDoctor(id, updateDoctorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(id);
  }
}
