import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
  },
];
