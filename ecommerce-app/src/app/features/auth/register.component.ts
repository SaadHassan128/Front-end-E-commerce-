import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow">
            <div class="card-body p-4">
              <h2 class="text-center mb-4">Create Account</h2>

              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstname" class="form-label">First Name</label>
                    <input
                      type="text"
                      id="firstname"
                      formControlName="firstname"
                      class="form-control"
                      [class.is-invalid]="isFieldInvalid('firstname')"
                      placeholder="Enter your first name"
                    />
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('firstname')">
                      First name is required
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="lastname" class="form-label">Last Name</label>
                    <input
                      type="text"
                      id="lastname"
                      formControlName="lastname"
                      class="form-control"
                      [class.is-invalid]="isFieldInvalid('lastname')"
                      placeholder="Enter your last name"
                    />
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('lastname')">
                      Last name is required
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('email')"
                    placeholder="Enter your email"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
                    <span *ngIf="registerForm.get('email')?.errors?.['required']">
                      Email is required
                    </span>
                    <span *ngIf="registerForm.get('email')?.errors?.['email']">
                      Please enter a valid email address
                    </span>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    formControlName="username"
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('username')"
                    placeholder="Choose a username"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('username')">
                    Username is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <input
                      [type]="showPassword ? 'text' : 'password'"
                      id="password"
                      formControlName="password"
                      class="form-control"
                      [class.is-invalid]="isFieldInvalid('password')"
                      placeholder="Choose a password"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      (click)="togglePasswordVisibility()"
                    >
                      <i
                        class="bi"
                        [class.bi-eye]="!showPassword"
                        [class.bi-eye-slash]="showPassword"
                      ></i>
                    </button>
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('password')">
                      <span *ngIf="registerForm.get('password')?.errors?.['required']">
                        Password is required
                      </span>
                      <span *ngIf="registerForm.get('password')?.errors?.['minlength']">
                        Password must be at least 6 characters
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <div class="input-group">
                    <input
                      [type]="showPassword ? 'text' : 'password'"
                      id="confirmPassword"
                      formControlName="confirmPassword"
                      class="form-control"
                      [class.is-invalid]="isFieldInvalid('confirmPassword')"
                      placeholder="Confirm your password"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      (click)="togglePasswordVisibility()"
                    >
                      <i
                        class="bi"
                        [class.bi-eye]="!showPassword"
                        [class.bi-eye-slash]="showPassword"
                      ></i>
                    </button>
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('confirmPassword')">
                      <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">
                        Password confirmation is required
                      </span>
                      <span
                        *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']"
                      >
                        Passwords do not match
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="terms"
                    formControlName="terms"
                  />
                  <label class="form-check-label" for="terms">
                    I agree to the <a href="#">Terms & Conditions</a>
                  </label>
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('terms')">
                    You must agree to the Terms & Conditions
                  </div>
                </div>

                <div class="d-grid mb-3">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="registerForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                  </button>
                </div>

                <div *ngIf="error" class="alert alert-danger">
                  {{ error }}
                </div>

                <div class="text-center">
                  <p>
                    Already have an account?
                    <a routerLink="/auth/login">Login here</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .input-group .btn-outline-secondary {
        border-top-right-radius: var(--bs-border-radius) !important;
        border-bottom-right-radius: var(--bs-border-radius) !important;
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.registerForm.get(field);
    return formField ? formField.invalid && formField.touched : false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = null;

      const { confirmPassword, terms, ...userData } = this.registerForm.value;

      this.authService
        .register({
          ...userData,
          name: {
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        })
        .subscribe({
          next: () => {
            // After successful registration, login with the new credentials
            this.authService
              .login({
                username: userData.username,
                password: userData.password,
              })
              .subscribe({
                next: () => this.router.navigate(['/']),
              });
          },
          error: (error) => {
            this.error = error.message || 'Failed to create account. Please try again.';
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
