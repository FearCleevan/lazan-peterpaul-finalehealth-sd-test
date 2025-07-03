// src/app/core/models/visit.model.ts
export type VisitType = 'Clinic' | 'Home' | 'Telehealth';

export interface Visit {
  id: string;
  patientId: string;
  visitDate: string; // ISO string format
  notes: string;
  visitType: VisitType;
  dateCreated: string;
  dateUpdated: string;
}