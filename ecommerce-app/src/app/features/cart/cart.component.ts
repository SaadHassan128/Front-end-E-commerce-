import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { Cart } from '../../shared/models/cart.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-4">
      <h1 class="mb-4">Shopping Cart</h1>

      <ng-container *ngIf="cart$ | async as cart">
        <div class="row" *ngIf="cart.items.length > 0; else emptyCart">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of cart.items">
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              [src]="item.product.image"
                              [alt]="item.product.title"
                              class="me-3"
                              style="width: 50px; height: 50px; object-fit: contain;"
                            />
                            <div>
                              <a
                                [routerLink]="['/products', item.product.id]"
                                class="text-decoration-none"
                              >
                                {{ item.product.title }}
                              </a>
                              <small class="text-muted d-block">
                                {{ item.product.category | titlecase }}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>{{ item.product.price | currency }}</td>
                        <td>
                          <div class="quantity-controls">
                            <button
                              class="btn btn-sm btn-outline-secondary"
                              (click)="updateQuantity(item.product.id, item.quantity - 1)"
                            >
                              <i class="bi bi-dash"></i>
                            </button>
                            <span class="mx-2">{{ item.quantity }}</span>
                            <button
                              class="btn btn-sm btn-outline-secondary"
                              (click)="updateQuantity(item.product.id, item.quantity + 1)"
                            >
                              <i class="bi bi-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td>{{ item.product.price * item.quantity | currency }}</td>
                        <td>
                          <button
                            class="btn btn-sm text-danger"
                            (click)="removeItem(item.product.id)"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mb-4">Order Summary</h5>

                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{{ cart.subtotal | currency }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Tax (10%):</span>
                  <span>{{ cart.tax | currency }}</span>
                </div>
                <hr />
                <div class="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong>{{ cart.total | currency }}</strong>
                </div>

                <div class="d-grid gap-2">
                  <button
                    class="btn btn-primary"
                    (click)="proceedToCheckout()"
                    [disabled]="!(isAuthenticated$ | async)"
                  >
                    Proceed to Checkout
                  </button>
                  <a routerLink="/products" class="btn btn-outline-primary"> Continue Shopping </a>
                </div>

                <div *ngIf="!(isAuthenticated$ | async)" class="alert alert-warning mt-3">
                  Please <a routerLink="/auth/login">login</a> to proceed with checkout.
                </div>
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>

    <ng-template #emptyCart>
      <div class="text-center py-5">
        <i class="bi bi-cart text-muted display-1"></i>
        <p class="lead mt-3">Your cart is empty</p>
        <a routerLink="/products" class="btn btn-primary"> Start Shopping </a>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .quantity-controls {
        display: flex;
        align-items: center;
      }

      td {
        vertical-align: middle;
      }
    `,
  ],
})
export class CartComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  cart$ = this.cartService.cart$;
  isAuthenticated$ = this.authService.isAuthenticated$;

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  proceedToCheckout(): void {
    // This will be handled by the router if the user is authenticated
  }
}
