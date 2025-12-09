import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { Cart } from '../../shared/models/cart.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title mb-4">Checkout</h3>

              <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
                <!-- Shipping Information -->
                <h4 class="mb-3">Shipping Information</h4>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="firstName"
                      [class.is-invalid]="isFieldInvalid('firstName')"
                    />
                    <div class="invalid-feedback">First name is required</div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="lastName"
                      [class.is-invalid]="isFieldInvalid('lastName')"
                    />
                    <div class="invalid-feedback">Last name is required</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Street Address</label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="streetAddress"
                    [class.is-invalid]="isFieldInvalid('streetAddress')"
                  />
                  <div class="invalid-feedback">Street address is required</div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Apartment/Suite (optional)</label>
                  <input type="text" class="form-control" formControlName="apartment" />
                </div>

                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="form-label">City</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="city"
                      [class.is-invalid]="isFieldInvalid('city')"
                    />
                    <div class="invalid-feedback">City is required</div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <label class="form-label">State</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="state"
                      [class.is-invalid]="isFieldInvalid('state')"
                    />
                    <div class="invalid-feedback">State is required</div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <label class="form-label">ZIP Code</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="zipCode"
                      [class.is-invalid]="isFieldInvalid('zipCode')"
                    />
                    <div class="invalid-feedback">ZIP code is required</div>
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

                <hr class="my-4" />

                <!-- Payment Information -->
                <h4 class="mb-3">Payment Information</h4>
                <div class="mb-3">
                  <label class="form-label">Card Number</label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="cardNumber"
                    [class.is-invalid]="isFieldInvalid('cardNumber')"
                    placeholder="1234 5678 9012 3456"
                  />
                  <div class="invalid-feedback">Valid card number is required</div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Expiration</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="expiration"
                      [class.is-invalid]="isFieldInvalid('expiration')"
                      placeholder="MM/YY"
                    />
                    <div class="invalid-feedback">Expiration date is required</div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">CVV</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="cvv"
                      [class.is-invalid]="isFieldInvalid('cvv')"
                      placeholder="123"
                    />
                    <div class="invalid-feedback">Security code is required</div>
                  </div>
                </div>

                <hr class="my-4" />

                <button
                  type="submit"
                  class="btn btn-primary btn-lg w-100"
                  [disabled]="checkoutForm.invalid || isLoading || !(cart$ | async)?.items?.length"
                >
                  {{ isLoading ? 'Processing...' : 'Place Order' }}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-4">Order Summary</h4>

              <ng-container *ngIf="cart$ | async as cart">
                <div class="mb-4">
                  <div *ngFor="let item of cart.items" class="d-flex justify-content-between mb-2">
                    <span> {{ item.product.title }} × {{ item.quantity }} </span>
                    <span>{{ item.product.price * item.quantity | currency }}</span>
                  </div>
                </div>

                <hr />

                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{{ cart.subtotal | currency }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Tax</span>
                  <span>{{ cart.tax | currency }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <strong>Total</strong>
                  <strong>{{ cart.total | currency }}</strong>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckoutComponent {
  private formBuilder = inject(FormBuilder);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  cart$ = this.cartService.cart$;
  isLoading = false;

  checkoutForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    streetAddress: ['', Validators.required],
    apartment: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    expiration: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/?([0-9]{2})$')]],
    cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
  });

  constructor() {
    // Pre-fill form with user data if available
    this.authService.currentUser$.subscribe((user: any) => {
      if (user) {
        this.checkoutForm.patchValue({
          firstName: user.name.firstname,
          lastName: user.name.lastname,
        });
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.checkoutForm.get(field);
    return formField ? formField.invalid && formField.touched : false;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.isLoading = true;

      // Simulate order processing
      setTimeout(() => {
        this.cartService.clearCart();
        this.router.navigate(['/user/orders'], {
          queryParams: { orderSuccess: true },
        });
      }, 2000);
    } else {
      Object.keys(this.checkoutForm.controls).forEach((key) => {
        const control = this.checkoutForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
