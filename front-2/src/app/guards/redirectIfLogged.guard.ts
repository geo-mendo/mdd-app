import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../domain/auth/services/auth.service';
import { RoutesEnum } from '../infrastructure/routes/routes';

export const RedirectIfLoggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const url = state.url;
  const isAuthRoutes = url === 
  RoutesEnum.HOME || 
  url === RoutesEnum.SIGNIN || 
  url === RoutesEnum.SIGNUP;

  return authService.isLogged().pipe(
    map(isLoggedIn => {
      if (isAuthRoutes && isLoggedIn) {
        router.navigate([RoutesEnum.DASHBOARD]);
        return false;
      }
      return true;
    })
  );
};