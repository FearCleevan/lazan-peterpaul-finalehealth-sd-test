import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { materialModules } from '../../../../shared/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Patient } from '../../../../core/models/patient.model';
import { Visit } from '../../../../core/models/visit.model';

@Component({
  selector: 'app-patient-visits',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ...materialModules,
  ],
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.scss'],
})
export class PatientVisitsComponent {
  patientId: string;
  visits: Visit[] = [];
  patient: Patient | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockData: MockDataService
  ) {
    this.patientId = this.route.snapshot.params['id'];
    this.loadData();
  }

  loadData(): void {
    this.mockData.getVisits(this.patientId).subscribe({
      next: (visits: Visit[]) => {
        this.visits = visits;
        this.patient = this.mockData.getPatientById(this.patientId);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  addNewVisit(): void {
    this.router.navigate(['/patients', this.patientId, 'visits', 'add']);
  }

  editVisit(visitId: string): void {
    this.router.navigate([
      '/patients',
      this.patientId,
      'visits',
      'edit',
      visitId,
    ]);
  }

  navigateBack(): void {
    this.router.navigate(['/patients']);
  }
}
