import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../../core/services/wishlist.service';
import { Product } from '../../../shared/models/product.interface';

@Component({
  selector: 'app-wishlist-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="wishlist-btn" 
      [class.active]="isInWishlist" 
      (click)="toggleWishlist()"
      aria-label="Add to wishlist">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  `,
  styles: [`
    .wishlist-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 5px;
      transition: transform 0.2s ease;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .wishlist-btn:hover {
      transform: scale(1.1);
    }
    
    .wishlist-btn.active {
      color: var(--danger);
    }
    
    .wishlist-btn.active svg {
      fill: var(--danger);
    }
  `]
})
export class WishlistButtonComponent implements OnInit {
  @Input() product!: Product;
  isInWishlist = false;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.checkWishlistStatus();
  }

  checkWishlistStatus(): void {
    this.isInWishlist = this.wishlistService.isInWishlist(this.product.id);
  }

  toggleWishlist(): void {
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
    } else {
      this.wishlistService.addToWishlist(this.product);
    }
    this.checkWishlistStatus();
  }
}