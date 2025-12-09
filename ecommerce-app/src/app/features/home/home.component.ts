import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../shared/models/product.interface';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="hero bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="display-4">Welcome to E-Shop</h1>
            <p class="lead">Discover amazing products at unbeatable prices</p>
            <a routerLink="/products" class="btn btn-light btn-lg">Shop Now</a>
          </div>
          <div class="col-md-6">
            <!-- Add hero image here -->
          </div>
        </div>
      </div>
    </div>

    <section class="featured-products py-5">
      <div class="container">
        <h2 class="text-center mb-4">Featured Products</h2>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <div class="col" *ngFor="let product of featuredProducts$ | async">
            <div class="card h-100 product-card">
              <div class="card-img-wrapper">
                <img [src]="product.image" [alt]="product.title" class="card-img-top" />
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ product.title }}</h5>
                <div class="mt-auto">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="h5 mb-0">{{ product.price | currency }}</span>
                  </div>
                  <div class="d-flex align-items-center mb-2">
                    <button class="btn btn-sm btn-outline-secondary" (click)="decreaseQuantity(product.id)">-</button>
                    <span class="mx-2 fw-bold">{{ getQuantity(product.id) }}</span>
                    <button class="btn btn-sm btn-outline-secondary" (click)="increaseQuantity(product.id)">+</button>
                  </div>
                  <div class="d-grid gap-2">
                    <button class="btn btn-primary" (click)="addToCartWithQuantity(product)">
                      <i class="bi bi-cart-plus"></i> Add {{ getQuantity(product.id) }} to Cart
                    </button>
                    <a [routerLink]="['/products', product.id]" class="btn btn-outline-secondary">More Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features py-5 bg-secondary">
      <div class="container">
        <h2 class="text-center mb-5">Why Shop With Us</h2>
        <div class="row g-4">
          <div class="col-md-3">
            <div class="feature-card text-center">
              <div class="icon-wrapper mb-3">
                <i class="bi bi-truck fs-1"></i>
              </div>
              <h3 class="h5">Free Shipping</h3>
              <p>Free shipping on all orders over $50</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-card text-center">
              <div class="icon-wrapper mb-3">
                <i class="bi bi-shield-check fs-1"></i>
              </div>
              <h3 class="h5">Secure Payments</h3>
              <p>Protected by industry-leading encryption</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-card text-center">
              <div class="icon-wrapper mb-3">
                <i class="bi bi-arrow-counterclockwise fs-1"></i>
              </div>
              <h3 class="h5">Easy Returns</h3>
              <p>30-day money-back guarantee</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="feature-card text-center">
              <div class="icon-wrapper mb-3">
                <i class="bi bi-headset fs-1"></i>
              </div>
              <h3 class="h5">24/7 Support</h3>
              <p>Customer service available anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="categories py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-4">Shop by Category</h2>
        <div class="row">
          <div class="col-md-3" *ngFor="let category of categories$ | async">
            <a
              [routerLink]="['/products']"
              [queryParams]="{ category: category }"
              class="text-decoration-none"
            >
              <div class="card category-card text-center mb-4">
                <div class="card-body">
                  <i class="bi bi-collection display-4"></i>
                  <h5 class="card-title mt-3">{{ category | titlecase }}</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        padding: 5rem 0;
      }

      .product-card img {
        height: 200px;
        object-fit: contain;
      }

      .product-card {
        transition: transform 0.2s;
        height: 100%;
      }
      .product-card:hover {
        transform: translateY(-5px);
      }
      .card-img-wrapper {
        height: 200px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f8f9fa;
      }
      .card-img-top {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        padding: 10px;
      }
      .card-body {
        display: flex;
        flex-direction: column;
      }
      .card-title {
        font-size: 1rem;
        line-height: 1.2;
        height: 2.4em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .category-card {
        transition: transform 0.3s ease;
      }

      .category-card:hover {
        transform: translateY(-5px);
      }

      .features {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
      }

      .feature-card {
        padding: 2rem;
        border-radius: 0.5rem;
        background-color: var(--card-bg);
        height: 100%;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .icon-wrapper {
        height: 70px;
        width: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border-radius: 50%;
        background-color: var(--bg-secondary);
        color: var(--primary-color);
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  featuredProducts$: Observable<Product[]>;
  categories$: Observable<string[]>;
  quantities: { [productId: number]: number } = {};

  constructor(private apiService: ApiService, private cartService: CartService) {
    this.featuredProducts$ = this.apiService.getProducts();
    this.categories$ = this.apiService.getCategories();
  }

  ngOnInit(): void {}

  getQuantity(productId: number): number {
    return this.quantities[productId] || 1;
  }

  increaseQuantity(productId: number): void {
    this.quantities[productId] = this.getQuantity(productId) + 1;
  }

  decreaseQuantity(productId: number): void {
    const currentQuantity = this.getQuantity(productId);
    if (currentQuantity > 1) {
      this.quantities[productId] = currentQuantity - 1;
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  addToCartWithQuantity(product: Product): void {
    const quantity = this.getQuantity(product.id);
    for (let i = 0; i < quantity; i++) {
      this.cartService.addToCart(product);
    }
    // Reset quantity after adding to cart
    this.quantities[product.id] = 1;
  }
}
