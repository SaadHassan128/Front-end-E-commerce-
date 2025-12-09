import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () => import('@features/products/products.routes').then((m) => m.PRODUCTS_ROUTES),
  },
  {
    path: 'cart',
    loadChildren: () => import('@features/cart/cart.routes').then((m) => m.CART_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () => import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('@features/user/user.routes').then((m) => m.USER_ROUTES),
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('@features/checkout/checkout.routes').then((m) => m.CHECKOUT_ROUTES),
  },
  {
    path: 'about',
    loadComponent: () => import('@features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('@features/wishlist/wishlist.component').then((m) => m.WishlistComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
