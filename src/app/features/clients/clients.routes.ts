import { Routes } from '@angular/router';

export const clientsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./client-list').then((m) => m.ClientList),
  },
  {
    path: 'new',
    loadComponent: () => import('./client-form').then((m) => m.ClientForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./client-detail').then((m) => m.ClientDetail),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./client-form').then((m) => m.ClientForm),
  },
];
