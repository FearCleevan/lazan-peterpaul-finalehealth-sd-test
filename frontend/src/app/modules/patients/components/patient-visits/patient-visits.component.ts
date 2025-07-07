// src/app/modules/patients/components/patient-visits/patient-visits.component.ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { VisitFormDialogComponent } from '../visit-form-dialog/visit-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { VisitViewDialogComponent } from '../visit-view-dialog/visit-view-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    TruncatePipe,
    ...materialModules,
  ],
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.module.scss'],
})
export class PatientVisitsComponent implements AfterViewInit {
  patientId: string;
  visits: Visit[] = [];
  patient: Patient | undefined;
  isLoading = true;
  displayedColumns: string[] = ['visitDate', 'visitType', 'notes', 'actions'];
  dataSource = new MatTableDataSource<Visit>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockData: MockDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.patientId = this.route.snapshot.params['id'];
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // Custom sorting for date fields
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'visitDate': 
          return new Date(item.visitDate).getTime();
        default: 
          return item[property as keyof Visit] as string;
      }
    };
  }

  loadData(): void {
    this.mockData.getVisitsByPatientId(this.patientId).subscribe({  // Changed from getVisits to getVisitsByPatientId
      next: (visits: Visit[]) => {
        this.visits = visits;
        this.dataSource.data = visits;
        this.mockData.getPatientById(this.patientId).subscribe({
          next: (patient: Patient | undefined) => {
            this.patient = patient;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getVisitTypeClass(visitType: string): string {
    return visitType.toLowerCase();
  }

  addNewVisit(): void {
    const dialogRef = this.dialog.open(VisitFormDialogComponent, {
      width: '600px',
      data: { 
        patientId: this.patientId,
        visit: null
      }
    });

    dialogRef.afterClosed().subscribe((result: Omit<Visit, 'id' | 'dateCreated' | 'dateUpdated'> | undefined) => {
      if (result) {
        this.mockData.addVisit(result).subscribe({
          next: (newVisit: Visit) => {
            this.visits = [...this.visits, newVisit];
            this.dataSource.data = this.visits;
            this.showSnackbar('Visit added successfully');
          },
          error: () => this.showSnackbar('Failed to add visit', 'error')
        });
      }
    });
  }

  viewVisit(visitId: string): void {
    this.mockData.getVisitById(visitId).subscribe({
      next: (visit: Visit | undefined) => {
        if (visit) {
          this.dialog.open(VisitViewDialogComponent, {
            width: '600px',
            data: {
              visit,
              patientName: `${this.patient?.firstName} ${this.patient?.lastName}`
            }
          });
        }
      },
      error: () => this.showSnackbar('Failed to load visit details', 'error')
    });
  }

  editVisit(visitId: string): void {
    this.mockData.getVisitById(visitId).subscribe({
      next: (visit: Visit | undefined) => {
        if (visit) {
          const dialogRef = this.dialog.open(VisitFormDialogComponent, {
            width: '600px',
            data: { patientId: this.patientId, visit }
          });

          dialogRef.afterClosed().subscribe((result: Partial<Visit> | undefined) => {
            if (result) {
              this.mockData.updateVisit(visitId, result).subscribe({
                next: (updatedVisit: Visit | undefined) => {
                  if (updatedVisit) {
                    const index = this.visits.findIndex(v => v.id === visitId);
                    if (index !== -1) {
                      this.visits[index] = updatedVisit;
                      this.visits = [...this.visits];
                      this.dataSource.data = this.visits;
                    }
                    this.showSnackbar('Visit updated successfully');
                  }
                },
                error: () => this.showSnackbar('Failed to update visit', 'error')
              });
            }
          });
        }
      }
    });
  }

  deleteVisit(visitId: string): void {
    this.mockData.deleteVisit(visitId).subscribe({
      next: () => {
        this.visits = this.visits.filter(v => v.id !== visitId);
        this.dataSource.data = this.visits;
        this.showSnackbar('Visit deleted successfully');
      },
      error: () => this.showSnackbar('Failed to delete visit', 'error')
    });
  }

  private showSnackbar(message: string, panelClass: string = 'success'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`snackbar-${panelClass}`]
    });
  }

  navigateBack(): void {
    this.router.navigate(['/patients']);
  }
}