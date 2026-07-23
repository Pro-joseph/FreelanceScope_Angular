import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import type { Project } from '../../core/models';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
})
export class ProjectDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  project: Project | null = null;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.projectService.get(id).subscribe((p) => (this.project = p));
  }
}
