import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsModule } from './patients/patients.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/patient-visit'),
    PatientsModule,
    VisitsModule,
  ],
})
export class AppModule {}