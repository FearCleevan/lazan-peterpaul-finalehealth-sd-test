import { Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientVisitsComponent } from './components/patient-visits/patient-visits.component';

export const patientRoutes: Routes = [
  { path: '', component: PatientListComponent, title: 'Patients' },
  { path: 'add', component: PatientFormComponent, title: 'Add Patient' },
  { path: 'edit/:id', component: PatientFormComponent, title: 'Edit Patient' },
  { path: ':id/visits', component: PatientVisitsComponent, title: 'Patient Visits' }
];