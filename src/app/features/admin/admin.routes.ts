import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

export const adminRoutes: Routes = [
  {
    path: 'freelances',
    canActivate: [roleGuard(['admin'])],
    loadComponent: () => import('./freelance-list').then((m) => m.FreelanceList),
  },
  {
    path: 'freelances/:id/edit',
    canActivate: [roleGuard(['admin'])],
    loadComponent: () => import('./freelance-edit').then((m) => m.FreelanceEdit),
  },
  {
    path: 'clients',
    canActivate: [roleGuard(['admin'])],
    loadComponent: () => import('./admin-client-list').then((m) => m.AdminClientList),
  },
  {
    path: 'devis',
    canActivate: [roleGuard(['admin'])],
    loadComponent: () => import('./admin-devis-list').then((m) => m.AdminDevisList),
  },
];
