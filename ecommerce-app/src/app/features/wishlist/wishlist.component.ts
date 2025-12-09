import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../shared/models/product.interface';
import { CartService } from '../../core/services/cart.service';
import { WishlistButtonComponent } from '../../shared/components/wishlist-button/wishlist-button.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, WishlistButtonComponent],
  template: `
    <div class="wishlist-container">
      <h1>My Wishlist</h1>
      
      <div *ngIf="wishlistItems.length === 0" class="empty-wishlist">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <p>Your wishlist is empty</p>
        <a routerLink="/products" class="btn-primary">Browse Products</a>
      </div>
      
      <div *ngIf="wishlistItems.length > 0" class="wishlist-grid">
        <div *ngFor="let product of wishlistItems" class="product-card">
          <div class="product-image">
            <img [src]="product.image" [alt]="product.title">
            <app-wishlist-button [product]="product"></app-wishlist-button>
          </div>
          <div class="product-info">
            <h3><a [routerLink]="['/products', product.id]">{{ product.title }}</a></h3>
            <p class="price">{{ product.price | currency }}</p>
            <div class="actions">
              <button class="btn-primary" (click)="addToCart(product)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wishlist-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 2rem;
      color: var(--text-primary);
    }
    
    .empty-wishlist {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      background-color: var(--surface);
      border-radius: 8px;
      box-shadow: var(--shadow-sm);
    }
    
    .empty-wishlist svg {
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    
    .empty-wishlist p {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      color: var(--text-secondary);
    }
    
    .wishlist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .product-card {
      background-color: var(--surface);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }
    
    .product-image {
      position: relative;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--surface-variant);
      padding: 1rem;
    }
    
    .product-image img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
    
    .product-image app-wishlist-button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    
    .product-info {
      padding: 1rem;
    }
    
    .product-info h3 {
      margin-bottom: 0.5rem;
      font-size: 1rem;
      height: 2.4rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .product-info h3 a {
      color: var(--text-primary);
      text-decoration: none;
    }
    
    .price {
      font-weight: bold;
      color: var(--primary);
      margin-bottom: 1rem;
    }
    
    .actions {
      display: flex;
      justify-content: space-between;
    }
    
    .btn-primary {
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
      display: inline-block;
      transition: background-color 0.2s ease;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-dark);
    }
  `]
})
export class WishlistComponent implements OnInit {
  wishlistItems: Product[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlistItems = items;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}