// src/app/core/services/mock-data.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
      dateUpdated: new Date().toISOString(),
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
      dateUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      firstName: 'Jim',
      lastName: 'Beam',
      dob: '1980-10-10',
      email: 'jim@example.com',
      phoneNumber: '555-555-5555',
      address: '456 Oak Ave',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    },
  ];

  private visits: Visit[] = [
    {
      id: '1',
      patientId: '1',
      visitDate: new Date().toISOString(),
      notes: 'Initial consultation',
      visitType: 'Clinic',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      patientId: '2',
      visitDate: new Date(Date.now() - 86400000).toISOString(),
      notes: 'Follow-up appointment',
      visitType: 'Telehealth',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      patientId: '3',
      visitDate: new Date(Date.now() - 86400000).toISOString(),
      notes: 'Follow-up appointment',
      visitType: 'Clinic',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    },
  ];

  getPatients(): Observable<Patient[]> {
    return of([...this.patients]);
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    const patient = this.patients.find(p => p.id === id);
    return of(patient);
  }

  addPatient(patientData: Omit<Patient, 'id' | 'dateCreated' | 'dateUpdated'>): Observable<Patient> {
    const newPatient: Patient = {
      ...patientData,
      id: (this.patients.length + 1).toString(),
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString()
    };
    this.patients.push(newPatient);
    return of(newPatient);
  }

  updatePatient(id: string, patientData: Partial<Patient>): Observable<Patient | undefined> {
    const index = this.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.patients[index] = {
        ...this.patients[index],
        ...patientData,
        dateUpdated: new Date().toISOString()
      };
      return of(this.patients[index]);
    }
    return of(undefined);
  }

  deletePatient(id: string): Observable<boolean> {
    const index = this.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.patients.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  getVisits(): Observable<Visit[]> {
    return of([...this.visits]);
  }

  getVisitsByPatientId(patientId: string): Observable<Visit[]> {
    return of(this.visits.filter(v => v.patientId === patientId));
  }

  getVisitById(id: string): Observable<Visit | undefined> {
    const visit = this.visits.find(v => v.id === id);
    return of(visit);
  }

  addVisit(visitData: Omit<Visit, 'id' | 'dateCreated' | 'dateUpdated'>): Observable<Visit> {
    const newVisit: Visit = {
      ...visitData,
      id: (this.visits.length + 1).toString(),
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString()
    };
    this.visits.push(newVisit);
    return of(newVisit);
  }

  updateVisit(id: string, visitData: Partial<Visit>): Observable<Visit | undefined> {
    const index = this.visits.findIndex(v => v.id === id);
    if (index !== -1) {
      const updatedVisit = {
        ...this.visits[index],
        ...visitData,
        dateUpdated: new Date().toISOString()
      };
      this.visits[index] = updatedVisit;
      return of(updatedVisit);
    }
    return of(undefined);
  }

  deleteVisit(id: string): Observable<boolean> {
    const index = this.visits.findIndex(v => v.id === id);
    if (index !== -1) {
      this.visits.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}