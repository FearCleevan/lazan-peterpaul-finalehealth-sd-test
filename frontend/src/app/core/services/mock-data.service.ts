import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Visit } from '../models/visit.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private patients: Patient[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      email: 'john@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString()
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      dob: '1985-05-15',
      email: 'jane@example.com',
      phoneNumber: '987-654-3210',
      address: '456 Oak Ave',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString()
    }
  ];

  private visits: Visit[] = [
    {
      id: '1',
      patientId: '1',
      visitDate: new Date().toISOString(),
      notes: 'Initial consultation',
      visitType: 'Clinic',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString()
    },
    {
      id: '2',
      patientId: '1',
      visitDate: new Date(Date.now() - 86400000).toISOString(),
      notes: 'Follow-up appointment',
      visitType: 'Telehealth',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString()
    }
  ];

  getPatients() {
    return of([...this.patients]);
  }

  getPatientById(id: string): Patient | undefined {
    return this.patients.find(p => p.id === id);
  }

  addPatient(patientData: Omit<Patient, 'id' | 'dateCreated' | 'dateUpdated'>) {
    const newPatient: Patient = {
      ...patientData,
      id: (this.patients.length + 1).toString(),
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString()
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  updatePatient(id: string, patientData: Partial<Patient>) {
    const index = this.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.patients[index] = {
        ...this.patients[index],
        ...patientData,
        dateUpdated: new Date().toISOString()
      };
      return this.patients[index];
    }
    return undefined;
  }

  deletePatient(id: string) {
    const index = this.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.patients.splice(index, 1);
      return true;
    }
    return false;
  }

  getVisits(patientId: string) {
    return of(this.visits.filter(v => v.patientId === patientId));
  }

  getVisitById(id: string): Visit | undefined {
    return this.visits.find(v => v.id === id);
  }

  addVisit(visitData: Omit<Visit, 'id' | 'dateCreated' | 'dateUpdated'>) {
    const newVisit: Visit = {
      ...visitData,
      id: (this.visits.length + 1).toString(),
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString()
    };
    this.visits.push(newVisit);
    return of(newVisit);
  }

  updateVisit(id: string, visitData: Partial<Visit>) {
    const index = this.visits.findIndex(v => v.id === id);
    if (index !== -1) {
      this.visits[index] = {
        ...this.visits[index],
        ...visitData,
        dateUpdated: new Date().toISOString()
      };
      return of(this.visits[index]);
    }
    return of(undefined);
  }
}