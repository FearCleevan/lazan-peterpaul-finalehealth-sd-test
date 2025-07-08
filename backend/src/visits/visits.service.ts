import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Visit, VisitDocument } from './schema/visit.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
  ) {}

  async create(createVisitDto: CreateVisitDto): Promise<Visit> {
    const createdVisit = new this.visitModel({
      ...createVisitDto,
      patientId: new Types.ObjectId(createVisitDto.patientId)
    });
    return createdVisit.save();
  }

  async findAllByPatient(patientId: string): Promise<Visit[]> {
    return this.visitModel.find({ 
      patientId: new Types.ObjectId(patientId) 
    }).exec();
  }

  async findOne(id: string): Promise<Visit | null> {
    return this.visitModel.findById(id).exec();
  }

  async update(id: string, updateVisitDto: UpdateVisitDto): Promise<Visit | null> {
    const updateData: any = { ...updateVisitDto };
    if (updateVisitDto.patientId) {
      updateData.patientId = new Types.ObjectId(updateVisitDto.patientId);
    }
    return this.visitModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Visit | null> {
    return this.visitModel.findByIdAndDelete(id).exec();
  }
}