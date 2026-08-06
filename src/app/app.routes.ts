import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register').then((m) => m.Register),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password').then((m) => m.ForgotPassword),
  },
  {
    path: 'reset-password/:token',
    loadComponent: () => import('./features/auth/reset-password').then((m) => m.ResetPassword),
  },
  {
    path: '',
    loadComponent: () => import('./core/layout/default-layout').then((m) => m.DefaultLayout),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/auth/profile').then((m) => m.Profile),
      },
      {
        path: 'clients',
        loadChildren: () => import('./features/clients/clients.routes').then((m) => m.clientsRoutes),
      },
      {
        path: 'devis',
        loadComponent: () => import('./features/devis/devis-list').then((m) => m.DevisList),
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.routes').then((m) => m.projectsRoutes),
      },
      {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
