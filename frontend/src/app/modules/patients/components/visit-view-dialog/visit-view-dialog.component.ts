// src/app/modules/patients/components/visit-view-dialog/visit-view-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Visit } from '../../../../core/models/visit.model';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-visit-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './visit-view-dialog.component.html',
  styleUrls: ['./visit-view-dialog.component.scss'],
  providers: [DatePipe]
})
export class VisitViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VisitViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { visit: Visit, patientName: string },
    private datePipe: DatePipe
  ) {}

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'medium') || '';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}