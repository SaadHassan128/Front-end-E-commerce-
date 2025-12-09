import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Order, OrderStatus } from '../../shared/models/cart.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-4">
      <div
        *ngIf="showSuccessMessage"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        Your order has been successfully placed!
        <button type="button" class="btn-close" (click)="dismissSuccessMessage()"></button>
      </div>

      <h2 class="mb-4">Order History</h2>

      <div *ngIf="orders.length === 0" class="text-center py-5">
        <i class="bi bi-receipt text-muted display-1"></i>
        <p class="lead mt-3">No orders found</p>
        <a routerLink="/products" class="btn btn-primary">Start Shopping</a>
      </div>

      <div class="accordion" *ngIf="orders.length > 0">
        <div class="accordion-item" *ngFor="let order of orders">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" (click)="toggleOrder(order.id)">
              <div class="d-flex justify-content-between w-100 me-3">
                <span>Order #{{ order.id }}</span>
                <div class="d-flex align-items-center">
                  <span class="badge" [ngClass]="getStatusBadgeClass(order.status)">
                    {{ order.status }}
                  </span>
                  <span class="ms-3">{{ order.total | currency }}</span>
                </div>
              </div>
            </button>
          </h2>
          <div class="accordion-collapse collapse" [class.show]="order.id === expandedOrderId">
            <div class="accordion-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of order.products">
                      <td>
                        <div class="d-flex align-items-center">
                          <img
                            [src]="item.product.image"
                            [alt]="item.product.title"
                            class="me-3"
                            style="width: 50px; height: 50px; object-fit: contain;"
                          />
                          <a
                            [routerLink]="['/products', item.product.id]"
                            class="text-decoration-none"
                          >
                            {{ item.product.title }}
                          </a>
                        </div>
                      </td>
                      <td>{{ item.product.price | currency }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.product.price * item.quantity | currency }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="row mt-4">
                <div class="col-md-6">
                  <h5>Shipping Address</h5>
                  <address>
                    {{ order.shippingAddress.firstName }} {{ order.shippingAddress.lastName }}<br />
                    {{ order.shippingAddress.streetAddress }}<br />
                    <ng-container *ngIf="order.shippingAddress.apartment">
                      {{ order.shippingAddress.apartment }}<br />
                    </ng-container>
                    {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }}
                    {{ order.shippingAddress.zipCode }}<br />
                    {{ order.shippingAddress.phone }}
                  </address>
                </div>
                <div class="col-md-6">
                  <h5>Order Summary</h5>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Status:</span>
                    <span class="badge" [ngClass]="getStatusBadgeClass(order.status)">
                      {{ order.status }}
                    </span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Order Date:</span>
                    <span>{{ order.createdAt | date : 'medium' }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Payment Method:</span>
                    <span>{{ order.paymentMethod | titlecase }}</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>{{ order.total | currency }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  expandedOrderId: number | null = null;
  showSuccessMessage = false;

  constructor(private route: ActivatedRoute) {
    // Mock orders data - in a real app, this would come from a service
    this.orders = [
      {
        id: 1,
        userId: 1,
        billingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          streetAddress: '123 Main St',
          city: 'Anytown',
          state: 'ST',
          zipCode: '12345',
          country: 'USA',
          phone: '123-456-7890',
        },
        products: [
          {
            product: {
              id: 1,
              title: 'Sample Product 1',
              price: 29.99,
              description: 'Sample description',
              category: 'electronics',
              image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
              rating: { rate: 4.5, count: 120 },
            },
            quantity: 2,
          },
        ],
        total: 59.98,
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          streetAddress: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA',
          phone: '123-456-7890',
        },
        status: 'delivered',
        paymentMethod: 'credit_card',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.showSuccessMessage = params['orderSuccess'] === 'true';
    });
  }

  toggleOrder(orderId: number): void {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  dismissSuccessMessage(): void {
    this.showSuccessMessage = false;
  }

  getStatusBadgeClass(status: OrderStatus): string {
    const classes = {
      pending: 'bg-warning',
      processing: 'bg-info',
      shipped: 'bg-primary',
      delivered: 'bg-success',
      cancelled: 'bg-danger',
    };
    return classes[status] || 'bg-secondary';
  }
}
