import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { materialModules } from '../../../../shared/material';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface PatientForm {
  firstName: string;
  lastName: string;
  dob: Date | null;
  email: string;
  phoneNumber: string;
  address: string;
}

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ...materialModules
  ],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  isEditMode = false;
  patientId: string | null = null;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mockData: MockDataService
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.patientId;
    
    if (this.isEditMode) {
      this.loadPatientData();
    }
  }

  loadPatientData(): void {
    const patient = this.mockData.getPatientById(this.patientId!);
    if (patient) {
      this.form.patchValue({
        firstName: patient.firstName,
        lastName: patient.lastName,
        dob: new Date(patient.dob),
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        address: patient.address
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value as PatientForm;
      const patientData = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        dob: formValue.dob?.toISOString().split('T')[0] || '',
        email: formValue.email,
        phoneNumber: formValue.phoneNumber,
        address: formValue.address
      };

      if (this.isEditMode) {
        const updatedPatient = this.mockData.updatePatient(this.patientId!, patientData);
        if (updatedPatient) {
          this.router.navigate(['/patients']);
        }
      } else {
        this.mockData.addPatient(patientData);
        this.router.navigate(['/patients']);
      }
    }
  }
}