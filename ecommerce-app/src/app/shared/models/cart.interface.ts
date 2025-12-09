import { Product } from './product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface Order {
  id: number;
  userId: number;
  products: CartItem[];
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'paypal' | 'stripe';
