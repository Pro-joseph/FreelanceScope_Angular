import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { jsonHeadersInterceptor } from './core/interceptors/json-headers.interceptor';
import { sanctumTokenInterceptor } from './core/interceptors/sanctum-token.interceptor';
import { ssrProxyInterceptor } from './core/interceptors/ssr-proxy.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([jsonHeadersInterceptor, ssrProxyInterceptor, sanctumTokenInterceptor])),
  ],
};
