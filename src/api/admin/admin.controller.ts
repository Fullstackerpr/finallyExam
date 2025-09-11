import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from 'src/common/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AcceptRoles } from 'src/common/decorator/role.decorator';
import { Roles } from 'src/common/enums';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/common/utils/types/admin.type';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.adminService.Login(loginDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  @AcceptRoles(Roles.SUPERADMIN)
  create(
    @Body() createAdminDto: CreateAdminDto,
    @CurrentUser() currentAdmin: JwtPayload,
  ) {
    return this.adminService.createAdmin(createAdminDto, currentAdmin);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  @AcceptRoles(Roles.SUPERADMIN)
  findAll(@CurrentUser() currentAdmin: JwtPayload) {
    return this.adminService.getAllAdmin(currentAdmin);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  @AcceptRoles(Roles.SUPERADMIN)
  findOne(@Param('id') id: string, @CurrentUser() currentAdmin: JwtPayload) {
    return this.adminService.getByIdAdmin(id, currentAdmin);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  @AcceptRoles(Roles.SUPERADMIN, Roles.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @CurrentUser() currentAdmin: JwtPayload,
  ) {
    return this.adminService.updateAdmin(id, currentAdmin, updateAdminDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  @AcceptRoles(Roles.SUPERADMIN)
  remove(@Param('id') id: string, @CurrentUser() currentAdmin: JwtPayload) {
    return this.adminService.deleteAdmin(id, currentAdmin);
  }
}
