import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../shared/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems: Product[] = [];
  private wishlistSubject = new BehaviorSubject<Product[]>([]);

  constructor() {
    // Load wishlist from localStorage on service initialization
    this.loadWishlist();
  }

  private loadWishlist(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlistItems = JSON.parse(storedWishlist);
      this.wishlistSubject.next(this.wishlistItems);
    }
  }

  private saveWishlist(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    this.wishlistSubject.next(this.wishlistItems);
  }

  getWishlist(): Observable<Product[]> {
    return this.wishlistSubject.asObservable();
  }

  addToWishlist(product: Product): void {
    if (!this.isInWishlist(product.id)) {
      this.wishlistItems.push(product);
      this.saveWishlist();
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems = this.wishlistItems.filter((item) => item.id !== productId);
    this.saveWishlist();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.some((item) => item.id === productId);
  }

  clearWishlist(): void {
    this.wishlistItems = [];
    this.saveWishlist();
  }

  getWishlistCount(): Observable<number> {
    return new BehaviorSubject<number>(this.wishlistItems.length).asObservable();
  }
}