import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export const ssrProxyInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformServer(platformId) && req.url.startsWith('http://localhost/api')) {
    const proxied = req.clone({
      url: req.url.replace('http://localhost/api', 'http://nginx/api'),
    });
    return next(proxied);
  }
  return next(req);
};