import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

const isBrowser = typeof localStorage !== 'undefined';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (!isBrowser) return true;
  const token = localStorage.getItem('auth_token');
  if (!token) {
    return router.parseUrl('/login');
  }
  return true;
};
