import { Routes } from '@angular/router';

export const devisRoutes: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./devis-generate').then((m) => m.DevisGenerate),
  },
  {
    path: ':devisId',
    loadComponent: () => import('./devis-preview').then((m) => m.DevisPreview),
  },
  {
    path: ':devisId/edit',
    loadComponent: () => import('./devis-edit').then((m) => m.DevisEdit),
  },
];
