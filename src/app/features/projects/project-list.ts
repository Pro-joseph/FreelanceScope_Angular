import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import type { Project } from '../../core/models';

@Component({
  selector: 'app-project-list',
  imports: [RouterLink],
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects: Project[] = [];

  ngOnInit() {
    this.projectService.list().subscribe((p) => (this.projects = p));
  }
}
