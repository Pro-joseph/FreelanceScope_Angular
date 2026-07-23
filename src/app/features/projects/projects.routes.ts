import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./project-list').then((m) => m.ProjectList),
  },
  {
    path: 'new',
    loadComponent: () => import('./project-form').then((m) => m.ProjectForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./project-form').then((m) => m.ProjectForm),
  },
  {
    path: ':id/ai-estimation',
    loadComponent: () => import('./ai-estimation').then((m) => m.AiEstimation),
  },
  {
    path: ':id/features/:featureId/edit',
    loadComponent: () => import('./feature-form').then((m) => m.FeatureForm),
  },
  {
    path: ':id/devis',
    loadChildren: () => import('../devis/devis.routes').then((m) => m.devisRoutes),
  },
];
