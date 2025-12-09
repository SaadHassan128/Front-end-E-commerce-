import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../../shared/models/profile.interface';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>My Addresses</h2>
        <button class="btn btn-primary" (click)="showAddressForm()">Add New Address</button>
      </div>

      <div class="row">
        <!-- Address List -->
        <div class="col-md-8">
          <div class="card mb-3" *ngFor="let address of addresses">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="card-title">
                    {{ address.street }}
                    <span class="badge bg-primary ms-2" *ngIf="address.isDefault">Default</span>
                  </h5>
                  <p class="card-text mb-1">
                    {{ address.city }}, {{ address.state }} {{ address.zipCode }}
                  </p>
                  <p class="card-text">{{ address.country }}</p>
                </div>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" (click)="editAddress(address)">
                    Edit
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    (click)="deleteAddress(address)"
                    [disabled]="address.isDefault"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Address Form -->
        <div class="col-md-4" *ngIf="showForm">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-3">{{ editingAddress ? 'Edit' : 'Add' }} Address</h5>
              <form [formGroup]="addressForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="street" class="form-label">Street Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="street"
                    formControlName="street"
                    [class.is-invalid]="isFieldInvalid('street')"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('street')">
                    Street address is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="city" class="form-label">City</label>
                  <input
                    type="text"
                    class="form-control"
                    id="city"
                    formControlName="city"
                    [class.is-invalid]="isFieldInvalid('city')"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('city')">
                    City is required
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="state" class="form-label">State</label>
                    <input
                      type="text"
                      class="form-control"
                      id="state"
                      formControlName="state"
                      [class.is-invalid]="isFieldInvalid('state')"
                    />
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('state')">
                      State is required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="zipCode" class="form-label">ZIP Code</label>
                    <input
                      type="text"
                      class="form-control"
                      id="zipCode"
                      formControlName="zipCode"
                      [class.is-invalid]="isFieldInvalid('zipCode')"
                    />
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('zipCode')">
                      ZIP code is required
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="country" class="form-label">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    id="country"
                    formControlName="country"
                    [class.is-invalid]="isFieldInvalid('country')"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('country')">
                    Country is required
                  </div>
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isDefault"
                    formControlName="isDefault"
                  />
                  <label class="form-check-label" for="isDefault"> Set as default address </label>
                </div>

                <div class="d-grid gap-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="addressForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Saving...' : 'Save Address' }}
                  </button>
                  <button type="button" class="btn btn-outline-secondary" (click)="cancelEdit()">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddressComponent implements OnInit {
  addresses: Address[] = [];
  addressForm: FormGroup;
  showForm = false;
  isLoading = false;
  editingAddress: Address | null = null;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.createAddressForm();
  }

  ngOnInit(): void {
    // Load addresses from service
    this.addresses = [
      {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true,
      },
    ];
  }

  createAddressForm(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['', Validators.required],
      isDefault: [false],
    });
  }

  showAddressForm(): void {
    this.showForm = true;
    this.editingAddress = null;
    this.addressForm.reset({ isDefault: false });
  }

  editAddress(address: Address): void {
    this.showForm = true;
    this.editingAddress = address;
    this.addressForm.patchValue(address);
  }

  deleteAddress(address: Address): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addresses = this.addresses.filter((a) => a !== address);
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingAddress = null;
    this.addressForm.reset();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.addressForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.isLoading = true;
      const formValue = this.addressForm.value;

      if (formValue.isDefault) {
        this.addresses.forEach((a) => (a.isDefault = false));
      }

      if (this.editingAddress) {
        // Update existing address
        const index = this.addresses.indexOf(this.editingAddress);
        this.addresses[index] = { ...formValue };
      } else {
        // Add new address
        this.addresses.push(formValue);
      }

      this.showForm = false;
      this.editingAddress = null;
      this.addressForm.reset();
      this.isLoading = false;
    } else {
      Object.keys(this.addressForm.controls).forEach((key) => {
        const control = this.addressForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
