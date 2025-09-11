import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/core/entity/appointment.entity';
import { AppointmentRepository } from 'src/core/repository/appointment.repository';
import { catchError, successRes } from 'src/infrastructure/response';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepo: AppointmentRepository,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    try {
      const { schedule_at } = createAppointmentDto;

      const schedule = await this.appointmentRepo.findOne({
        where: { schedule_at },
      });

      if (schedule) {
        throw new ConflictException(
          `Schedule at ${schedule_at} already exists`,
        );
      }

      const appointment = this.appointmentRepo.create(createAppointmentDto);
      await this.appointmentRepo.save(appointment);

      return successRes(appointment, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async getAllAppointment() {
    try {
      const appointments = await this.appointmentRepo.find();
      return successRes(appointments);
    } catch (error) {
      return catchError(error);
    }
  }

  async getById(id: string) {
    try {
      const appointment = await this.appointmentRepo.findOne({ where: { id } });
      if (!appointment) {
        throw new NotFoundException('Appointment not found!');
      }

      return successRes(appointment);
    } catch (error) {
      return catchError(error);
    }
  }

  async updateAppoinment(
    id: string,
    updateAppoinmentDto: UpdateAppointmentDto,
  ) {
    try {
      const appointment = await this.appointmentRepo.findOne({ where: { id } });
      if (!appointment) {
        throw new NotFoundException('Appointment not found!');
      }

      await this.appointmentRepo.update(id, updateAppoinmentDto);
      const updatedAppoinment = await this.appointmentRepo.findOne({
        where: { id },
      });

      return successRes(updatedAppoinment);
    } catch (error) {
      return catchError(error);
    }
  }

  async deleteAppointment(id: string) {
    try {
      const appointment = await this.appointmentRepo.findOne({ where: { id } });
      if (!appointment) {
        throw new NotFoundException('Appointment not found!');
      }

      await this.appointmentRepo.delete({ id });
      return successRes({})
    } catch (error) {
      return catchError(error);
    }
  }
}
