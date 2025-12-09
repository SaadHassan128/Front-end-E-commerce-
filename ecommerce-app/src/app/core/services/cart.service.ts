import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart, CartItem } from '../../shared/models/cart.interface';
import { Product } from '../../shared/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly TAX_RATE = 0.1; // 10% tax rate
  private readonly STORAGE_KEY = 'cart';

  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    totalItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
  });

  cart$ = this.cartSubject.asObservable();
  cartItemCount$ = this.cart$.pipe(map((cart) => cart.totalItems));
  totalItems$ = this.cart$.pipe(map((cart) => cart.totalItems));

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const storedCart = localStorage.getItem(this.STORAGE_KEY);
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  private recalculateCart(items: CartItem[]): Cart {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * this.TAX_RATE;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      totalItems,
      subtotal,
      tax,
      total: subtotal + tax,
    };
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.items.find((item) => item.product.id === product.id);

    let updatedItems: CartItem[];
    if (existingItem) {
      updatedItems = currentCart.items.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedItems = [...currentCart.items, { product, quantity }];
    }

    const updatedCart = this.recalculateCart(updatedItems);
    this.saveCart(updatedCart);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.filter((item) => item.product.id !== productId);
    const updatedCart = this.recalculateCart(updatedItems);
    this.saveCart(updatedCart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items
      .map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
      .filter((item) => item.quantity > 0);

    const updatedCart = this.recalculateCart(updatedItems);
    this.saveCart(updatedCart);
  }

  clearCart(): void {
    const emptyCart: Cart = {
      items: [],
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      total: 0,
    };
    this.saveCart(emptyCart);
  }

  getCartItem(productId: number): CartItem | undefined {
    return this.cartSubject.value.items.find((item) => item.product.id === productId);
  }

  isInCart(productId: number): boolean {
    return this.cartSubject.value.items.some((item) => item.product.id === productId);
  }
}
