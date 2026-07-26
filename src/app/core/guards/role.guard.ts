import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import type { UserRole } from '../models';

const isBrowser = typeof localStorage !== 'undefined';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return async () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!isBrowser) return true;

    await authService.init();

    const user = authService.user();
    if (!user) return router.parseUrl('/login');
    if (allowedRoles.includes(user.role)) return true;

    return router.parseUrl('/dashboard');
  };
};
