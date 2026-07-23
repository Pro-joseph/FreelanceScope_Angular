import { HttpInterceptorFn } from '@angular/common/http';

const isBrowser = typeof localStorage !== 'undefined';

export const sanctumTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isBrowser) return next(req);
  const token = localStorage.getItem('auth_token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req);
};
