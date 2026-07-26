import { afterNextRender, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import type { Project } from '../../core/models';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  readonly project = signal<Project | null>(null);

  constructor() {
    const id = this.route.snapshot.params['id'];
    afterNextRender(() => {
      this.projectService.get(id).subscribe((p) => this.project.set(p));
    });
  }
}
