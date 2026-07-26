import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-feature-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './feature-form.html',
})
export class FeatureForm {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);

  readonly form = this.fb.nonNullable.group({
    name: [''],
    description: [''],
    complexity: ['moyen' as 'simple' | 'moyen' | 'complexe'],
  });

  projectId = 0;
  featureId = 0;
  error = '';

  constructor() {
    this.projectId = +this.route.snapshot.params['id'];
    this.featureId = +this.route.snapshot.params['featureId'];
  }

  submit() {
    this.error = '';
    this.projectService
      .updateFeature(this.projectId, this.featureId, this.form.getRawValue() as any)
      .subscribe({
        next: () => this.router.navigate(['/projects', this.projectId]),
        error: (err) => {
          this.error = err.error?.message || "Erreur lors de la mise à jour";
        },
      });
  }
}