import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import type { UserRole } from '../models';

const isBrowser = typeof localStorage !== 'undefined';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    if (!isBrowser) return true;
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return router.parseUrl('/login');
    }
    try {
      const user = JSON.parse(userStr);
      if (allowedRoles.includes(user.role)) {
        return true;
      }
      return router.parseUrl('/dashboard');
    } catch {
      return router.parseUrl('/login');
    }
  };
};
