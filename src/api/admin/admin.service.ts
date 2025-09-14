import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/core/entity/admin.entity';
import { AdminRepository } from 'src/core/repository/admin.repository';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { Token } from 'src/infrastructure/generate-token';
import { DataSource, Not } from 'typeorm';
import { catchError, successRes } from 'src/infrastructure/response';
import config from 'src/config';
import { Roles } from 'src/common/enums';
import { JwtPayload } from 'src/common/utils/types/admin.type';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: AdminRepository,

    private readonly bcrypt: BcryptEncryption,
    private readonly token: Token,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const existingSuperAdmin = await this.adminRepo.findOne({
      where: { role: Roles.SUPERADMIN },
    });

    if (!existingSuperAdmin) {
      const hashedPassword = await this.bcrypt.encrypt(config.SUPERADMIN_P);

      const superAdmin = this.adminRepo.create({
        username: config.SUPERADMIN_US,
        full_name: config.SUPERADMIN_FN,
        phone_number: config.SUPERADMIN_PN,
        password: hashedPassword,
        role: Roles.SUPERADMIN,
      });

      await this.adminRepo.save(superAdmin);
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto, currentAdmin: JwtPayload) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { full_name, username, password, phone_number, status } =
        createAdminDto;

      const existUsername = await queryRunner.manager.findOne(AdminEntity, {
        where: { username },
      });
      if (existUsername) {
        throw new ConflictException(`Username already exists`);
      }

      const existPhoneNumber = await queryRunner.manager.findOne(AdminEntity, {
        where: { phone_number },
      });
      if (existPhoneNumber) {
        throw new ConflictException(`Phone number already exists`);
      }

      const hashedPassword = await this.bcrypt.encrypt(password);

      const newAdmin = queryRunner.manager.create(AdminEntity, {
        full_name,
        username,
        phone_number,
        password: hashedPassword,
        status,
        role: Roles.ADMIN,
      });

      await queryRunner.manager.save(newAdmin);

      await queryRunner.commitTransaction();

      return successRes(newAdmin, 201);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return catchError(error);
    } finally {
      await queryRunner.release();
    }
  }

  async Login(loginDto: LoginDto) {
    try {
      const { username, password } = loginDto;

      const admin = await this.adminRepo.findOne({ where: { username } });
      if (!admin) throw new UnauthorizedException('Invalid credentials');

      const isMatch = await this.bcrypt.compare(password, admin.password);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');

      const payload = {
        id: admin.id,
        role: admin.role,
        status: admin.status,
      };

      const tokens = await this.token.generateTokens(payload);

      return {
        message: 'Login successful',
        ...tokens,
      };
    } catch (error) {
      return catchError(error);
    }
  }

  async getAllAdmin(currentAdmin: JwtPayload) {
    try {
      if (currentAdmin.role !== Roles.SUPERADMIN) {
        throw new BadRequestException('Only SuperAdmin can view all admins');
      }

      const admins = await this.adminRepo.find({
        where: { role: Not(Roles.SUPERADMIN) },
      });
      return successRes(admins);
    } catch (error) {
      return catchError(error);
    }
  }

  async getByIdAdmin(id: string, currentAdmin: JwtPayload) {
    try {
      if (currentAdmin.role !== Roles.SUPERADMIN) {
        throw new BadRequestException('Only SuperAdmin can view all admins');
      }

      const admin = await this.adminRepo.findOne({
        where: { id: id, role: Not(Roles.SUPERADMIN) },
      });
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
      return successRes(admin);
    } catch (error) {
      return catchError(error);
    }
  }

  async updateAdmin(
    id: string,
    currentAdmin: JwtPayload,
    updateAdminDto: UpdateAdminDto,
  ) {
    try {
      const { password, ...otherFields } = updateAdminDto;

      const admin = await this.adminRepo.findOne({
        where: { id: id, role: Roles.ADMIN },
      });

      if (!admin) {
        throw new NotFoundException('Admin not found');
      }

      if (currentAdmin.role === Roles.ADMIN && currentAdmin.id !== id) {
        throw new BadRequestException(
          'Admins can only update their own profile',
        );
      }

      if (otherFields.status && currentAdmin.role !== Roles.SUPERADMIN) {
        throw new BadRequestException('Only SuperAdmin can change status');
      }

      if (otherFields.phone_number) {
        const existPhoneNumber = await this.adminRepo.findOne({
          where: { phone_number: otherFields.phone_number },
        });
        if (existPhoneNumber && existPhoneNumber.id !== id) {
          throw new ConflictException(
            `${otherFields.phone_number} already exists`,
          );
        }
      }

      let hashedPassword: string | undefined;
      if (password) {
        hashedPassword = await this.bcrypt.encrypt(password);
      }

      Object.assign(admin, {
        ...otherFields,
        ...(hashedPassword && { password: hashedPassword }),
      });

      await this.adminRepo.save(admin);

      const updatedAdmin = await this.adminRepo.findOne({ where: { id } });
      return successRes(updatedAdmin);
    } catch (error) {
      return catchError(error);
    }
  }

  async deleteAdmin(id: string, currentAdmin: JwtPayload) {
    try {
      if (currentAdmin.role !== Roles.SUPERADMIN) {
        throw new BadRequestException('Only SuperAdmin can delete admins');
      }
      const admin = await this.adminRepo.findOne({ where: { id } });
      if (!admin) {
        throw new NotFoundException('admin not found');
      }
      if (admin.role === Roles.SUPERADMIN) {
        throw new BadRequestException('Super admin can not be deleted');
      }
      await this.adminRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
