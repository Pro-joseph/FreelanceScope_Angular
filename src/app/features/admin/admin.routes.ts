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
];
