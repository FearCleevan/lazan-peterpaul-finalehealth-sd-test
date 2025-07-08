import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VisitType } from '../schema/visit.schema';

export class CreateVisitDto {
  @IsNotEmpty()
  @IsString()
  patientId?: string; // This will be converted to ObjectId by Mongoose

  @IsNotEmpty()
  @IsDateString()
  visitDate?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @IsEnum(VisitType)
  visitType?: VisitType;
}