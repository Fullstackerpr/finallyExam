import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDocumentDto } from './create-doctor-document.dto';

export class UpdateDoctorDocumentDto extends PartialType(CreateDoctorDocumentDto) {}
