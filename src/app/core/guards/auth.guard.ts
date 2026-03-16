import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isTokenValid()) {
    return true;
  }

  authService.logout();
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

export const publicGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn() || !authService.isTokenValid()) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
