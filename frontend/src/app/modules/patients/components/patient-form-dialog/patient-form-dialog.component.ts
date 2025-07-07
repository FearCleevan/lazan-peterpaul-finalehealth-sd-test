import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSnackBarModule
  ],
  templateUrl: './patient-form-dialog.component.html',
  styleUrls: ['./patient-form-dialog.module.scss']
})
export class PatientFormDialogComponent {
  form: FormGroup;
  isEditMode = false;
  title: string = 'Add New Patient';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    // Initialize form AFTER fb is defined
    this.form = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });

    if (this.data) {
      this.isEditMode = true;
      this.title = 'Edit Patient';
      this.form.patchValue(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      if (this.isEditMode) {
        formValue.id = this.data.id;
      }

      this.dialogRef.close(formValue);
      this.showSnackbar(
        this.isEditMode ? 'Patient updated successfully' : 'Patient added successfully'
      );
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