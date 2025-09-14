// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   UseInterceptors,
//   UploadedFiles,
//   BadRequestException,
// } from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { DoctorDocumentsService } from './doctor-documents.service';
// import { CreateDoctorDocumentDto } from './dto/create-doctor-document.dto';
// import { UpdateDoctorDocumentDto } from './dto/update-doctor-document.dto';
// import { JwtGuard } from 'src/common/guards/jwt.auth.guard';
// import { AdminGuard } from 'src/common/guards/admin.guard';

// @Controller('doctor-documents')
// @UseGuards(JwtGuard, AdminGuard)
// export class DoctorDocumentsController {
//   constructor(private readonly doctorDocumentsService: DoctorDocumentsService) {}

//   @Post('upload/:doctorId')
//   @UseInterceptors(FilesInterceptor('files', 5, {
//     limits: {
//       fileSize: 10 * 1024 * 1024, // 10MB per file
//     },
//     fileFilter: (req, file, callback) => {
//       // Allow only specific file types
//       const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];
//       if (allowedTypes.includes(file.mimetype)) {
//         callback(null, true);
//       } else {
//         callback(new BadRequestException('Only JPEG, PNG, JPG and PDF files are allowed'), false);
//       }
//     },
//   }))
//   async uploadDocuments(
//     @Param('doctorId') doctorId: string,
//     @UploadedFiles() files: Express.Multer.File[],
//     @Body('types') types: string | string[],
//   ) {
//     // Handle types as string or array
//     let typesArray: string[];
//     if (typeof types === 'string') {
//       try {
//         typesArray = JSON.parse(types);
//       } catch {
//         typesArray = [types];
//       }
//     } else {
//       typesArray = types || [];
//     }

//     return this.doctorDocumentsService.uploadDocuments(doctorId, files, typesArray);
//   }

//   @Get()
//   findAll() {
//     return this.doctorDocumentsService.findAll();
//   }

//   @Get('doctor/:doctorId')
//   findByDoctorId(@Param('doctorId') doctorId: string) {
//     return this.doctorDocumentsService.findByDoctorId(doctorId);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.doctorDocumentsService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateDoctorDocumentDto: UpdateDoctorDocumentDto) {
//     return this.doctorDocumentsService.update(id, updateDoctorDocumentDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.doctorDocumentsService.remove(id);
//   }
// }
