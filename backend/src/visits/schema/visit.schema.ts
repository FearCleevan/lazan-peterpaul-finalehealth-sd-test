import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VisitDocument = Visit & Document;

export enum VisitType {
  Home = 'Home',
  Telehealth = 'Telehealth',
  Clinic = 'Clinic',
}

@Schema({ timestamps: true })
export class Visit {
  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId!: Types.ObjectId; // ! for required fields

  @Prop({ required: true })
  visitDate!: Date; // ! for required fields

  @Prop()
  notes?: string; // ? for optional fields

  @Prop({ required: true, enum: VisitType })
  visitType!: VisitType; // ! for required fields
}

export const VisitSchema = SchemaFactory.createForClass(Visit);