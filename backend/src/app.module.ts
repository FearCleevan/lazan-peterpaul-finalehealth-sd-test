import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsModule } from './patients/patients.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Add this line
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/patient-visit'),
    PatientsModule,
    VisitsModule,
  ],
})
export class AppModule {}