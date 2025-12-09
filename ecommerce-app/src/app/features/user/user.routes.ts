import { Routes } from '@angular/router';
import { PersonalInfoComponent } from './components/personal-info.component';
import { AddressComponent } from './components/address.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const USER_ROUTES: Routes = [
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'personal-info',
    pathMatch: 'full',
  },
];
