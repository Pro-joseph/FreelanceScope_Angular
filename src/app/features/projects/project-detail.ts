import { afterNextRender, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { DevisService } from '../../core/services/devis.service';
import type { Devis, Project } from '../../core/models';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly devisService = inject(DevisService);

  readonly project = signal<Project | null>(null);
  readonly devisList = signal<Devis[]>([]);

  protected readonly projectId = +this.route.snapshot.params['id'];

  constructor() {
    afterNextRender(() => {
      this.projectService.get(this.projectId).subscribe((p) => this.project.set(p));
      this.devisService.list(this.projectId).subscribe((d) => this.devisList.set(d));
    });
  }

  downloadPdf(devisId: number) {
    this.devisService.downloadPdf(this.projectId, devisId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `devis-${devisId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
