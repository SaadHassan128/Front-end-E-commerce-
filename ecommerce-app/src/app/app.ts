import { Component } from "@angular/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "./core/services/auth.service";
import { CartService } from "./core/services/cart.service";
import { ThemeService } from "./core/services/theme.service";
import { WishlistService } from "./core/services/wishlist.service";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { User } from "./shared/models/user.interface";
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NgbDropdownModule, FooterComponent],
  template: `
    <div class="app-container" [class.dark-theme]="isDarkTheme$ | async">
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container">
          <a class="navbar-brand" routerLink="/">E-Shop</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link" routerLink="/products">Products</a>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <button class="nav-link btn btn-link" (click)="toggleTheme()">
                  <i class="bi" [class.bi-moon-stars]="!(isDarkTheme$ | async)" [class.bi-sun]="isDarkTheme$ | async"></i>
                </button>
              </li>
              <li class="nav-item">
                <a class="nav-link position-relative" routerLink="/cart">
                  Cart
                  <span *ngIf="cartItemCount$ | async as count" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ count }}
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link position-relative" routerLink="/wishlist">
                  <i class="bi bi-heart me-1"></i>Wishlist
                  <ng-container *ngIf="(wishlistItemCount$ | async) as count">
                    <span class="badge bg-danger ms-1" *ngIf="count > 0">
                      {{ count }}
                    </span>
                  </ng-container>
                </a>
              </li>
              <li class="nav-item" *ngIf="!(isAuthenticated$ | async)">
                <a class="nav-link" routerLink="/auth/login">Login</a>
              </li>
              <li class="nav-item" *ngIf="isAuthenticated$ | async" ngbDropdown>
                <a class="nav-link" id="userDropdown" role="button" ngbDropdownToggle>
                  {{ (currentUser$ | async)?.name?.firstname || "User" }}
                </a>
                <div class="dropdown-menu" ngbDropdownMenu aria-labelledby="userDropdown">
                  <a class="dropdown-item" routerLink="/user/personal-info">Personal Info</a>
                  <a class="dropdown-item" routerLink="/user/address">Addresses</a>
                  <a class="dropdown-item" routerLink="/user/orders">Orders</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" (click)="logout()">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="content-wrapper">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
    .content-wrapper {
      padding-top: 4.5rem;
      min-height: calc(100vh - 4.5rem);
    }
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .nav-link.btn-link {
      border: none;
      padding: 0.5rem 1rem;
    }
    .bi {
      font-size: 1.2rem;
    }
    .dark-theme .navbar {
      background-color: #2c3e50 !important;
    }
    .dark-theme .navbar-light .navbar-nav .nav-link {
      color: #ecf0f1;
    }
    .dark-theme .navbar-light .navbar-brand {
      color: #ecf0f1;
    }
    .dark-theme .navbar-toggler-icon {
      filter: invert(1);
    }
  `]
})
export class App {
  cartItemCount$: Observable<number>;
  wishlistItemCount$: Observable<number>;
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  isDarkTheme$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private themeService: ThemeService,
    private wishlistService: WishlistService
  ) {
    this.cartItemCount$ = this.cartService.cartItemCount$;
    this.wishlistItemCount$ = this.wishlistService.getWishlistCount();
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUser$ = this.authService.currentUser$;
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
  }
}