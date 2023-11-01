import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../domain/auth/services/auth.service';
import { map } from 'rxjs';
import { RoutesEnum } from '../infrastructure/routes/routes';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLogged().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate([RoutesEnum.HOME]);
        return false;
      }
      return true;
    })
  );
}
