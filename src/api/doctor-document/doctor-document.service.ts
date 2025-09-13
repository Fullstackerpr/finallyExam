// import {
//   ForbiddenException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class DoctorFileService {
//   constructor(
//     @InjectRepository(DoctorFileEntity)
//     private readonly doctorFileRepo: Repository<DoctorFileEntity>,
//     @InjectRepository(DoctorEntity)
//     private readonly doctorRepo: Repository<DoctorEntity>,
//     private readonly fileService: FileService,
//   ) {}

//   async create(
//     files: {
//       passport_file?: Express.Multer.File[];
//       diplom_file?: Express.Multer.File[];
//       yatt_file?: Express.Multer.File[];
//       sertifikat_file?: Express.Multer.File[];
//       tibiy_varaqa_file?: Express.Multer.File[];
//     },
//     req: Request,
//   ) {
//     const savetFiles: string[] = [];
//     const fileFields = [
//       'passport_file',
//       'diplom_file',
//       'yatt_file',
//       'sertifikat_file',
//       'tibiy_varaqa_file',
//     ];
//     const doctor_id = req['user'].id;

//     try {
//       const doctor = await this.doctorRepo.findOne({
//         where: { id: doctor_id },
//       });
//       if (!doctor) throw new NotFoundException('Doctor not found');

//       const doctor_files = await this.doctorFileRepo.findOne({
//         where: { doctor_id },
//       });

//       const updateFiles: Record<string, string> = {};

//       for (const field of fileFields) {
//         if (files[field]?.length) {
//           const file = await this.fileService.createFile(files[field][0]);
//           savetFiles.push(file);
//           updateFiles[field] = file;

//           if (
//             doctor_files &&
//             doctor_files[field] &&
//             (await this.fileService.existFile(doctor_files[field]))
//           ) {
//             try {
//               await this.fileService.deleteFile(doctor_files[field]);
//             } catch {}
//           }
//         }
//       }

//       let result: any = {};
//       if (doctor_files) {
//         await this.doctorFileRepo.update(doctor_files.id, updateFiles);
//         result = await this.doctorFileRepo.findOne({
//           where: { id: doctor_files.id },
//         });
//         return successRes(
//           result,
//           200,
//           "Malumotlaringiz muvaffaqiyatli o'zgartirildi.",
//         );
//       } else {
//         const newFiles = this.doctorFileRepo.create({
//           passport_file: updateFiles.passport_file || '',
//           diplom_file: updateFiles.diplom_file || '',
//           yatt_file: updateFiles.yatt_file || '',
//           sertifikat_file: updateFiles.sertifikat_file || '',
//           tibiy_varaqa_file: updateFiles.tibiy_varaqa_file || '',
//           doctor_id,
//         });
//         result = await this.doctorFileRepo.save(newFiles);

//         return successRes(
//           result,
//           201,
//           'Malumotlaringiz muvaffaqiyatli saqlandi.',
//         );
//       }
//     } catch (error) {
//       for (const f of savetFiles) {
//         if (await this.fileService.existFile(f)) {
//           await this.fileService.deleteFile(f).catch(() => {});
//         }
//       }
//       return ErrorHender(error);
//     }
//   }

//   async findAll(req: Request) {
//     const user = req['user'];
//     try {
//       const where = user.role === ERols.DOCTOR ? { doctor_id: user.id } : {};

//       const data = await this.doctorFileRepo.find({ where });
//       if (!data.length) {
//         throw new NotFoundException();
//       }
//       return successRes(data);
//     } catch (error) {
//       return ErrorHender(error);
//     }
//   }

//   async findOne(id: number, req: Request) {
//     const user = req['user'];
//     try {
//       const data = await this.doctorFileRepo.findOne({ where: { id } });
//       if (!data) {
//         throw new NotFoundException();
//       }
//       const isOwner = data.doctor_id === user.id;
//       const isAdmin = [ERols.ADMIN, ERols.SUPPER_ADMIN].includes(user.role);
//       if (!isOwner && !isAdmin) {
//         throw new ForbiddenException(
//           "Bu faylni ko'rish uchun sizda ruxsat yoq.",
//         );
//       }
//       return successRes(data);
//     } catch (error) {
//       return ErrorHender(error);
//     }
//   }

//   async remove(id: number, req: Request) {
//     const user = req['user'];
//     try {
//       const data = await this.doctorFileRepo.findOne({ where: { id } });
//       if (!data) {
//         throw new NotFoundException();
//       }
//       const isOwner = data.doctor_id === user.id;
//       const isAdmin = [ERols.ADMIN, ERols.SUPPER_ADMIN].includes(user.role);

//       if (!isOwner && !isAdmin) {
//         throw new ForbiddenException(
//           "Bu faylni o'chirish uchun sizda ruxsat yoq.",
//         );
//       }

//       const fileFields = [
//         'diplom_file',
//         'passport_file',
//         'sertifikat_file',
//         'tibiy_varaqa_file',
//         'yatt_file',
//       ];

//       for (const field of fileFields) {
//         const filePath = data[field];
//         if (filePath && (await this.fileService.existFile(filePath))) {
//           await this.fileService.deleteFile(filePath);
//         }
//       }

//       await this.doctorFileRepo.delete(id);

//       return { message: 'Deleted', statusCode: 200 };
//     } catch (error) {
//       return ErrorHender(error);
//     }
//   }
// }
