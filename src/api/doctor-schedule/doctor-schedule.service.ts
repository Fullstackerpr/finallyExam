import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { catchError, successRes } from 'src/infrastructure/response';
import { DoctorScheduleEntity } from 'src/core/entity/doctor-schedule';
import { DoctorEntity } from 'src/core/entity/doctor.entity';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctor-schedule.dto';

@Injectable()
export class DoctorScheduleService {
  constructor(
    @InjectRepository(DoctorScheduleEntity)
    private readonly scheduleRepo: Repository<DoctorScheduleEntity>,
    @InjectRepository(DoctorEntity)
    private readonly doctorRepo: Repository<DoctorEntity>,
  ) {}

  async create(createScheduleDto: CreateDoctorScheduleDto) {
    try {
      const { doctorId, date, startTime, endTime } = createScheduleDto;

      const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
      if (!doctor) throw new NotFoundException('Doctor not found!');

      const schedule = this.scheduleRepo.create({
        doctor,
        date,
        startTime,
        endTime,
      });
      await this.scheduleRepo.save(schedule);

      return successRes(schedule, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const schedules = await this.scheduleRepo.find({
        relations: ['doctor'],
        order: { date: 'ASC', startTime: 'ASC' },
      });
      return successRes(schedules);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: string) {
    try {
      const schedule = await this.scheduleRepo.findOne({
        where: { id },
        relations: ['doctor'],
      });
      if (!schedule) throw new NotFoundException('Schedule not found!');
      return successRes(schedule);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: string, updateScheduleDto: UpdateDoctorScheduleDto) {
    try {
      const schedule = await this.scheduleRepo.findOne({ where: { id } });
      if (!schedule) throw new NotFoundException('Schedule not found!');

      await this.scheduleRepo.update(id, updateScheduleDto);
      const updatedSchedule = await this.scheduleRepo.findOne({
        where: { id },
        relations: ['doctor'],
      });

      return successRes(updatedSchedule);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: string) {
    try {
      const schedule = await this.scheduleRepo.findOne({ where: { id } });
      if (!schedule) throw new NotFoundException('Schedule not found!');

      await this.scheduleRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
