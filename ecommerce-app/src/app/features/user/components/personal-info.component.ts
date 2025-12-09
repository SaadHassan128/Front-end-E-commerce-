import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfile } from '../../../shared/models/profile.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <h2 class="mb-4">Personal Information</h2>
      <div class="card">
        <div class="card-body">
          <form [formGroup]="personalInfoForm" (ngSubmit)="onSubmit()">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  formControlName="firstName"
                  [class.is-invalid]="isFieldInvalid('firstName')"
                />
                <div class="invalid-feedback" *ngIf="isFieldInvalid('firstName')">
                  First name is required
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  formControlName="lastName"
                  [class.is-invalid]="isFieldInvalid('lastName')"
                />
                <div class="invalid-feedback" *ngIf="isFieldInvalid('lastName')">
                  Last name is required
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                formControlName="email"
                [class.is-invalid]="isFieldInvalid('email')"
              />
              <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
                Please enter a valid email address
              </div>
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label">Phone Number</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                formControlName="phone"
                [class.is-invalid]="isFieldInvalid('phone')"
              />
              <div class="invalid-feedback" *ngIf="isFieldInvalid('phone')">
                Please enter a valid phone number
              </div>
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                type="submit"
                class="btn btn-primary"
                [disabled]="personalInfoForm.invalid || isLoading"
              >
                {{ isLoading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PersonalInfoComponent implements OnInit {
  personalInfoForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]+$/)]],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.personalInfoForm.patchValue({
          firstName: user.name?.firstname,
          lastName: user.name?.lastname,
          email: user.email,
          phone: user.phone || '',
        });
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.personalInfoForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.personalInfoForm.valid) {
      this.isLoading = true;
      // Here you would typically call your API service to update the user profile
      const updatedProfile = this.personalInfoForm.value;
      console.log('Updating profile:', updatedProfile);
      this.isLoading = false;
    } else {
      Object.keys(this.personalInfoForm.controls).forEach((key) => {
        const control = this.personalInfoForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
