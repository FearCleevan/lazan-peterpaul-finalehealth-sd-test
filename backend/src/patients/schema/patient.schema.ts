import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true })
  firstName!: string; // Definite assignment assertion

  @Prop({ required: true })
  lastName!: string; // Definite assignment assertion

  @Prop({ required: true })
  dob!: Date; // Definite assignment assertion

  @Prop({ required: true, unique: true })
  email!: string; // Definite assignment assertion

  @Prop({ required: true })
  phoneNumber!: string; // Definite assignment assertion

  @Prop({ required: true })
  address!: string; // Definite assignment assertion
}

export const PatientSchema = SchemaFactory.createForClass(Patient);