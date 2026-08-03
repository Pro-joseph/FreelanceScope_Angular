import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../core/services/project.service';
import { DevisService } from '../../core/services/devis.service';
import { NotificationService } from '../../shared/services/notification.service';
import type { Devis, Project } from '../../core/models';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly devisService = inject(DevisService);
  private readonly notify = inject(NotificationService);

  readonly project = signal<Project | null>(null);
  readonly devisList = signal<Devis[]>([]);

  constructor() {
    this.route.params.pipe(takeUntilDestroyed()).subscribe(params => {
      const id = +params['id'];
      this.projectService.get(id).subscribe({
        next: p => this.project.set(p),
        error: () => this.handleDenied(),
      });
      this.devisService.list(id).subscribe(d => this.devisList.set(d));
    });
  }

  private handleDenied() {
    this.notify.error("Ce projet n'existe pas ou vous n'y avez pas accès.");
    this.router.navigate(['/projects']);
  }

  delete() {
    const project = this.project();
    if (!project) return;
    if (!confirm('Supprimer ce projet ? Cette action est irréversible.')) return;
    this.projectService.delete(+this.route.snapshot.params['id']).subscribe({
      next: () => {
        this.notify.success('Projet supprimé');
        this.router.navigate(['/projects']);
      },
    });
  }

  deleteFeature(featureId: number) {
    if (!confirm('Supprimer cette fonctionnalité ?')) return;
    this.projectService.deleteFeature(featureId).subscribe({
      next: () => {
        this.project.update(p => p ? { ...p, features: p.features?.filter(f => f.id !== featureId) ?? [] } : p);
        this.notify.success('Fonctionnalité supprimée');
      },
    });
  }

  downloadPdf(devisId: number) {
    this.devisService.downloadPdf(+this.route.snapshot.params['id'], devisId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `devis-${devisId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
