import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'patients',
    loadComponent: () => import('./modules/patients/components/patient-list/patient-list.component').then(c => c.PatientListComponent),
    title: 'Patient List'
  },
  { 
    path: 'patients/add',
    loadComponent: () => import('./modules/patients/components/patient-form/patient-form.component').then(c => c.PatientFormComponent),
    title: 'Add Patient'
  },
  { 
    path: 'patients/:id/visits',
    loadComponent: () => import('./modules/patients/components/patient-visits/patient-visits.component').then(c => c.PatientVisitsComponent),
    title: 'Patient Visits'
  },
  { path: '', redirectTo: 'patients', pathMatch: 'full' }
];