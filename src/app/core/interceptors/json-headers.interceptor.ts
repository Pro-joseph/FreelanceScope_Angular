import { HttpInterceptorFn } from '@angular/common/http';

export const jsonHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({
    setHeaders: { Accept: 'application/json' },
  }));
};
