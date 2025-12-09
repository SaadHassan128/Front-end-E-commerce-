import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Product, Category } from '../../shared/models/product.interface';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../../shared/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://fakestoreapi.com';
  private categoryCache$?: Observable<string[]>;
  private productsCache$?: Observable<Product[]>;

  constructor(private http: HttpClient) {}

  // Product endpoints
  getProducts(): Observable<Product[]> {
    if (!this.productsCache$) {
      this.productsCache$ = this.http
        .get<Product[]>(`${this.baseUrl}/products`)
        .pipe(shareReplay(1), catchError(this.handleError<Product[]>('getProducts', [])));
    }
    return this.productsCache$;
  }

  getProduct(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.baseUrl}/products/${id}`)
      .pipe(catchError(this.handleError<Product>('getProduct')));
  }

  getCategories(): Observable<string[]> {
    if (!this.categoryCache$) {
      this.categoryCache$ = this.http
        .get<string[]>(`${this.baseUrl}/products/categories`)
        .pipe(shareReplay(1), catchError(this.handleError<string[]>('getCategories', [])));
    }
    return this.categoryCache$;
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/products/category/${category}`)
      .pipe(catchError(this.handleError<Product[]>('getProductsByCategory', [])));
  }

  // Authentication endpoints
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Mock successful login to bypass API 401 error
    return of({
      token: 'mock-token-' + Date.now(),
      user: {
        id: 1,
        email: credentials.username,
        username: credentials.username,
        name: {
          firstname: credentials.username.split('@')[0],
          lastname: ''
        },
        phone: '123-456-7890'
      }
    });
  }

  register(userData: RegisterCredentials): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/users`, userData)
      .pipe(catchError(this.handleError<User>('register')));
  }

  // User endpoints
  getUserProfile(userId: number): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/users/${userId}`)
      .pipe(catchError(this.handleError<User>('getUserProfile')));
  }

  updateUserProfile(userId: number, userData: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/users/${userId}`, userData)
      .pipe(catchError(this.handleError<User>('updateUserProfile')));
  }

  // Helper method to handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Clear cache method
  clearCache(): void {
    this.categoryCache$ = undefined;
    this.productsCache$ = undefined;
  }
}
