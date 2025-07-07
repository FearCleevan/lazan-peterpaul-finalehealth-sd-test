// src/app/modules/patients/components/visit-form-dialog/visit-form-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Visit, VisitType } from '../../../../core/models/visit.model';

@Component({
  selector: 'app-visit-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './visit-form-dialog.component.html',
  styleUrls: ['./visit-form-dialog.module.scss'] // Changed to module.scss
})
export class VisitFormDialogComponent {
  form: FormGroup;
  visitTypes: VisitType[] = ['Clinic', 'Home', 'Telehealth'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VisitFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string, visit?: Visit },
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      visitDate: [null, Validators.required],
      visitType: ['', Validators.required],
      notes: ['']
    });

    if (this.data.visit) {
      this.form.patchValue({
        visitDate: this.data.visit.visitDate,
        visitType: this.data.visit.visitType,
        notes: this.data.visit.notes
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const visitData: Omit<Visit, 'id' | 'dateCreated' | 'dateUpdated'> = {
        patientId: this.data.patientId,
        visitDate: new Date(formValue.visitDate).toISOString(),
        visitType: formValue.visitType,
        notes: formValue.notes
      };
      this.dialogRef.close(visitData);
    } else {
      this.showSnackbar('Please fill all required fields', 'error');
    }
  }

  private showSnackbar(message: string, panelClass: string = 'success'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`snackbar-${panelClass}`]
    });
  }
}