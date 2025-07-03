import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Patient } from '../../../../core/models/patient.model';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormDialogComponent } from '../patient-form-dialog/patient-form-dialog.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<Patient>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private mockData: MockDataService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loadPatients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPatients(): void {
    this.mockData.getPatients().subscribe((patients: Patient[]) => {
      this.dataSource.data = patients;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(PatientFormDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the new patient to your mock data
        const newPatient = this.mockData.addPatient(result);
        // Refresh the patient list
        this.loadPatients();
      }
    });
  }

  editPatient(id: string): void {
    this.router.navigate(['/patients/edit', id]);
  }

  viewVisits(id: string): void {
    this.router.navigate(['/patients', id, 'visits']);
  }
}