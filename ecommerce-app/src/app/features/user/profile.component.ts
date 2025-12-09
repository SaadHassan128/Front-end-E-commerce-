import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title mb-4">Profile Settings</h2>

              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="firstname"
                      [class.is-invalid]="isFieldInvalid('firstname')"
                    />
                    <div class="invalid-feedback">First name is required</div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="lastname"
                      [class.is-invalid]="isFieldInvalid('lastname')"
                    />
                    <div class="invalid-feedback">Last name is required</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    formControlName="email"
                    [class.is-invalid]="isFieldInvalid('email')"
                  />
                  <div class="invalid-feedback">
                    <span *ngIf="profileForm.get('email')?.errors?.['required']">
                      Email is required
                    </span>
                    <span *ngIf="profileForm.get('email')?.errors?.['email']">
                      Please enter a valid email address
                    </span>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Phone</label>
                  <input
                    type="tel"
                    class="form-control"
                    formControlName="phone"
                    [class.is-invalid]="isFieldInvalid('phone')"
                  />
                  <div class="invalid-feedback">Phone number is required</div>
                </div>

                <div class="mb-4">
                  <label class="form-label">Username</label>
                  <input type="text" class="form-control" formControlName="username" readonly />
                  <small class="text-muted">Username cannot be changed</small>
                </div>

                <div *ngIf="successMessage" class="alert alert-success">
                  {{ successMessage }}
                </div>

                <div *ngIf="error" class="alert alert-danger">
                  {{ error }}
                </div>

                <div class="d-flex justify-content-between">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="profileForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Saving...' : 'Save Changes' }}
                  </button>

                  <button type="button" class="btn btn-outline-danger" (click)="logout()">
                    Logout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  error: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      username: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue({
          firstname: user.name.firstname,
          lastname: user.name.lastname,
          email: user.email,
          phone: user.phone,
          username: user.username,
        });
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.profileForm.get(field);
    return formField ? formField.invalid && formField.touched : false;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.successMessage = null;
      this.error = null;

      const formValue = this.profileForm.getRawValue();
      const userData = {
        ...formValue,
        name: {
          firstname: formValue.firstname,
          lastname: formValue.lastname,
        },
      };

      this.authService.updateUserProfile(userData).subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully';
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to update profile';
          this.isLoading = false;
        },
      });
    } else {
      Object.keys(this.profileForm.controls).forEach((key) => {
        const control = this.profileForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
