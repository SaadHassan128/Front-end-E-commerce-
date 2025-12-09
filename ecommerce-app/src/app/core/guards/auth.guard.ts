import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
        return true;
      })
    );
  }
}
