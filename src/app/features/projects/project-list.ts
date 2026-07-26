import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import type { Project } from '../../core/models';

@Component({
  selector: 'app-project-list',
  imports: [RouterLink],
  templateUrl: './project-list.html',
})
export class ProjectList {
  private readonly projectService = inject(ProjectService);

  readonly projects = signal<Project[]>([]);

  constructor() {
    afterNextRender(() => {
      this.projectService.list().subscribe((p) => this.projects.set(p));
    });
  }
}
