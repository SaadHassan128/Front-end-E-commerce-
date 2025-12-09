import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from '../../shared/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();
  token$ = this.tokenSubject.asObservable();
  isAuthenticated$ = this.token$.pipe(map((token) => !!token));

  constructor(private apiService: ApiService, private router: Router) {
    this.loadAuthState();
  }

  private loadAuthState(): void {
    try {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('currentUser');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          this.currentUserSubject.next(JSON.parse(storedUser));
          this.tokenSubject.next(storedToken);
        }
      }
    } catch (error) {
      console.warn('LocalStorage not available');
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.apiService.login(credentials).pipe(
      tap((response) => {
        // Create a default user if not provided in the response
        const user: User = response.user || {
          id: 1,
          email: credentials.username,
          name: {
            firstname: 'User',
            lastname: ''
          }
        };
        this.setAuthState(user, response.token);
      })
    );
  }

  register(userData: RegisterCredentials): Observable<User> {
    return this.apiService.register(userData).pipe(
      tap((user) => {
        // Auto login after registration
        const token = 'auto-generated-token-' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.tokenSubject.next(token);
        this.router.navigate(['/']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  private setAuthState(user: User, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.currentUserSubject.next(user);
    this.tokenSubject.next(token);
  }

  updateUserProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    return this.apiService.updateUserProfile(currentUser.id, userData).pipe(
      tap((updatedUser) => {
        const token = this.tokenSubject.value;
        if (token) {
          this.setAuthState(updatedUser, token);
        }
      })
    );
  }

  getAuthToken(): string | null {
    return this.tokenSubject.value;
  }
}
