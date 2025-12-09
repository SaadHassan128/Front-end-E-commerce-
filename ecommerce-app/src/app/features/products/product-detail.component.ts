import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../shared/models/product.interface';
import { FormsModule } from '@angular/forms';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { WishlistButtonComponent } from '../../shared/components/wishlist-button/wishlist-button.component';
import { StarRatingComponent } from '@app/shared/components/star-rating/star-rating.component';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgbCarouselModule, WishlistButtonComponent],
  template: `
    <div class="container py-4" *ngIf="product$ | async as product">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/products">Products</a></li>
          <li class="breadcrumb-item">
            <a [routerLink]="['/products']" [queryParams]="{ category: product.category }">
              {{ product.category | titlecase }}
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>

      <div class="row">
        <!-- Product Image -->
        <div class="col-md-6 mb-4">
          <div class="text-center">
            <img [src]="product.image" [alt]="product.title" class="img-fluid product-image" style="max-height: 400px; object-fit: contain;">
          </div>
        </div>
        
        <!-- Product Details -->
        <div class="col-md-6">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <h1 class="mb-0">{{ product.title }}</h1>
            <app-wishlist-button [product]="product"></app-wishlist-button>
          </div>

          <div class="h2 mb-4 text-primary">
            {{ product.price | currency }}
          </div>

          <div class="d-flex align-items-center mb-4">
            <div class="input-group me-3" style="width: 150px;">
              <button class="btn btn-outline-secondary" type="button" (click)="decreaseQuantity()">
                <i class="bi bi-dash"></i>
              </button>
              <input type="number" class="form-control text-center" [value]="quantity()" readonly />
              <button class="btn btn-outline-secondary" type="button" (click)="increaseQuantity()">
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <button class="btn btn-primary btn-lg" (click)="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .product-card {
        transition: transform 0.3s ease;
      }

      .product-card:hover {
        transform: translateY(-5px);
      }

      .product-image {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;
  relatedProducts$: Observable<Product[]>;
  quantity = signal(1);

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService
  ) {
    this.product$ = this.route.params.pipe(
      switchMap((params) => this.apiService.getProduct(+params['id']))
    );

    this.relatedProducts$ = this.product$.pipe(
      switchMap((product) => this.apiService.getProductsByCategory(product.category))
    );
  }

  ngOnInit(): void {}

  increaseQuantity(): void {
    this.quantity.update((q) => q + 1);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.quantity());
    this.quantity.set(1);
  }
}
