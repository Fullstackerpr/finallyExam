// import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { DoctorDocumentsEntity } from 'src/core/entity/doctor-documents.entity';
// import { DoctorEntity } from 'src/core/entity/doctor.entity';
// import { CreateDoctorDocumentDto } from './dto/create-doctor-document.dto';
// import { UpdateDoctorDocumentDto } from './dto/update-doctor-document.dto';
// import * as path from 'path';
// import * as fs from 'fs';

// @Injectable()
// export class DoctorDocumentsService {
//   constructor(
//     @InjectRepository(DoctorDocumentsEntity)
//     private readonly doctorDocumentsRepository: Repository<DoctorDocumentsEntity>,
//     @InjectRepository(DoctorEntity)
//     private readonly doctorRepository: Repository<DoctorEntity>,
//   ) {}

//   async uploadDocuments(
//     doctorId: string,
//     files: Express.Multer.File[],
//     types: string[],
//   ) {
//     if (!files || files.length === 0) {
//       throw new BadRequestException('No files provided');
//     }

//     if (files.length > 5) {
//       throw new BadRequestException('Maximum 5 files allowed');
//     }

//     if (files.length !== types.length) {
//       throw new BadRequestException('Number of files must match number of types');
//     }

//     // Check if doctor exists
//     const doctor = await this.doctorRepository.findOne({
//       where: { id: doctorId },
//     });

//     if (!doctor) {
//       throw new BadRequestException('Doctor not found');
//     }

//     // Create upload directory if it doesn't exist
//     const uploadDir = path.join(process.cwd(), 'uploads', 'doctor-documents');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const savedDocuments = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const type = types[i];

//       // Generate unique filename
//       const timestamp = Date.now();
//       const fileExtension = path.extname(file.originalname);
//       const filename = `${doctorId}_${type}_${timestamp}${fileExtension}`;
//       const filePath = path.join(uploadDir, filename);

//       // Save file to disk
//       fs.writeFileSync(filePath, file.buffer);

//       // Save document record to database
//       const document = this.doctorDocumentsRepository.create({
//         doctor: { id: doctorId },
//         file_url: `/uploads/doctor-documents/${filename}`,
//         type: type,
//         uploaded_at: new Date(),
//       });

//       const savedDocument = await this.doctorDocumentsRepository.save(document);
//       savedDocuments.push(savedDocument);
//     }

//     return {
//       message: 'Documents uploaded successfully',
//       documents: savedDocuments,
//     };
//   }

//   async findAll() {
//     return await this.doctorDocumentsRepository.find({
//       relations: ['doctor'],
//     });
//   }

//   async findByDoctorId(doctorId: string) {
//     return await this.doctorDocumentsRepository.find({
//       where: { doctor: { id: doctorId } },
//       relations: ['doctor'],
//     });
//   }

//   async findOne(id: string) {
//     const document = await this.doctorDocumentsRepository.findOne({
//       where: { id },
//       relations: ['doctor'],
//     });

//     if (!document) {
//       throw new BadRequestException('Document not found');
//     }

//     return document;
//   }

//   async update(id: string, updateDoctorDocumentDto: UpdateDoctorDocumentDto) {
//     const document = await this.findOne(id);
    
//     Object.assign(document, updateDoctorDocumentDto);
//     return await this.doctorDocumentsRepository.save(document);
//   }

//   async remove(id: string) {
//     const document = await this.findOne(id);
    
//     // Delete file from disk
//     const filePath = path.join(process.cwd(), document.file_url);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     await this.doctorDocumentsRepository.remove(document);
//     return { message: 'Document deleted successfully' };
//   }
// }
