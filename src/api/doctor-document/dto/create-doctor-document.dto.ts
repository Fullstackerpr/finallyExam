// import { IsNotEmpty, IsString, IsArray, ArrayMaxSize } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateDoctorDocumentDto {
//   @ApiProperty({
//     example: 'doctor-123-456-789',
//     description: 'Shifokor ID si'
//   })
//   @IsNotEmpty()
//   @IsString()
//   doctor_id: string;

//   @ApiProperty({
//     type: 'array',
//     items: { type: 'string', format: 'binary' },
//     description: 'Yuklash uchun fayllar (maksimal 5 ta)',
//     maxItems: 5
//   })
//   @IsArray()
//   @ArrayMaxSize(5, { message: 'Maximum 5 files can be uploaded' })
//   files: Express.Multer.File[];

//   @ApiProperty({
//     example: ['Diplom', 'Sertifikat', 'Litsenziya'],
//     description: 'Hujjat turlari (maksimal 5 ta)',
//     maxItems: 5,
//     type: [String]
//   })
//   @IsArray()
//   @ArrayMaxSize(5, { message: 'Maximum 5 document types can be specified' })
//   types: string[];
// }
