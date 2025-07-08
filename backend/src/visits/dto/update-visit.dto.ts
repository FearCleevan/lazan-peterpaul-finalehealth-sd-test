import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { VisitType } from '../schema/visit.schema';

export class UpdateVisitDto {
  @IsOptional()
  @IsString()
  patientId?: string;

  @IsOptional()
  @IsDateString()
  visitDate?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(VisitType)
  visitType?: VisitType;
}