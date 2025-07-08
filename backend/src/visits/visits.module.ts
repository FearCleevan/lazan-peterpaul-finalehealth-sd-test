import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from './schema/visit.schema'; // Ensure this path matches your file structure
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: Visit.name, 
      schema: VisitSchema 
    }]),
    PatientsModule,
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}