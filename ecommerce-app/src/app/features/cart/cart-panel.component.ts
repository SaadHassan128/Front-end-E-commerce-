import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../shared/models/cart.interface';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cart-panel" [class.show]="isOpen">
      <div class="cart-panel-content">
        <div class="cart-header p-3 border-bottom">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Shopping Cart</h5>
            <button class="btn-close" (click)="close()"></button>
          </div>
        </div>

        <div class="cart-body p-3">
          <ng-container *ngIf="cart$ | async as cart">
            <div *ngIf="cart.items.length > 0; else emptyCart">
              <div class="cart-items">
                <div *ngFor="let item of cart.items" class="cart-item mb-3 border-bottom pb-3">
                  <div class="d-flex">
                    <img
                      [src]="item.product.image"
                      [alt]="item.product.title"
                      class="cart-item-image me-3"
                    />
                    <div class="flex-grow-1">
                      <h6 class="mb-1">{{ item.product.title }}</h6>
                      <div class="d-flex justify-content-between align-items-center">
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
                        <span class="text-primary">{{
                          item.product.price * item.quantity | currency
                        }}</span>
                      </div>
                    </div>
                    <button class="btn btn-sm text-danger" (click)="removeItem(item.product.id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="cart-summary mt-4">
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{{ cart.subtotal | currency }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Tax (10%):</span>
                  <span>{{ cart.tax | currency }}</span>
                </div>
                <div class="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong>{{ cart.total | currency }}</strong>
                </div>

                <div class="d-grid gap-2">
                  <a routerLink="/cart" class="btn btn-outline-primary" (click)="close()">
                    View Cart
                  </a>
                  <a routerLink="/checkout" class="btn btn-primary" (click)="close()"> Checkout </a>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>

    <div class="cart-backdrop" [class.show]="isOpen" (click)="close()"></div>

    <ng-template #emptyCart>
      <div class="text-center py-5">
        <i class="bi bi-cart text-muted display-1"></i>
        <p class="mt-3">Your cart is empty</p>
        <a routerLink="/products" class="btn btn-primary" (click)="close()"> Continue Shopping </a>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .cart-panel {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 400px;
        max-width: 100%;
        background: var(--body-bg);
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform var(--transition-speed) ease;
        z-index: 1050;
      }

      .cart-panel.show {
        transform: translateX(0);
      }

      .cart-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--transition-speed) ease;
        z-index: 1040;
      }

      .cart-backdrop.show {
        opacity: 1;
        visibility: visible;
      }

      .cart-panel-content {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .cart-body {
        flex: 1;
        overflow-y: auto;
      }

      .cart-item-image {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
      }

      @media (max-width: 576px) {
        .cart-panel {
          width: 100%;
        }
      }
    `,
  ],
})
export class CartPanelComponent {
  private cartService = inject(CartService);
  cart$ = this.cartService.cart$;
  isOpen = false;

  open(): void {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen = false;
    document.body.style.overflow = '';
  }

  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
