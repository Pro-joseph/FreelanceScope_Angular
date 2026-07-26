import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (typeof localStorage === 'undefined') return true;

  await authService.init();

  if (authService.isAuthenticated()) return true;

  return router.parseUrl('/login');
};
