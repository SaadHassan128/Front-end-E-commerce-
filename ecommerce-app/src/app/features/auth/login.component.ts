import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body p-4">
              <h2 class="text-center mb-4">Login</h2>

              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    formControlName="username"
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('username')"
                    placeholder="Enter your username"
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
                      placeholder="Enter your password"
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
                      Password is required
                    </div>
                  </div>
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="rememberMe"
                    formControlName="rememberMe"
                  />
                  <label class="form-check-label" for="rememberMe"> Remember me </label>
                </div>

                <div class="d-grid mb-3">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="loginForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Logging in...' : 'Login' }}
                  </button>
                </div>

                <div *ngIf="error" class="alert alert-danger">
                  {{ error }}
                </div>

                <div class="text-center">
                  <p>
                    Don't have an account?
                    <a routerLink="/auth/register">Register here</a>
                  </p>
                  <a routerLink="/auth/forgot-password">Forgot password?</a>
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
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  showPassword = false;
  private returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.loginForm.get(field);
    return formField ? formField.invalid && formField.touched : false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = null;

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          this.error = error.message || 'Failed to login. Please try again.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
