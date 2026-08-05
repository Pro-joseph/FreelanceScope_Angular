import { afterNextRender, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';
import { NotificationService } from '../../shared/services/notification.service';
import { of, switchMap } from 'rxjs';

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
  private readonly notify = inject(NotificationService);

  readonly form = this.fb.nonNullable.group({
    name: [''],
    description: [''],
    complexity: ['moyen' as 'simple' | 'moyen' | 'complexe'],
    hourly_rate: [0],
    total_hours: [0],
  });

  projectId = 0;
  featureId = 0;
  estimateId = 0;
  readonly error = signal('');

  constructor() {
    this.projectId = +this.route.snapshot.params['id'];
    this.featureId = +this.route.snapshot.params['featureId'];

    afterNextRender(() => {
      this.projectService.getFeature(this.featureId).subscribe({
        next: (feature) => {
          this.form.patchValue({
            name: feature.name,
            description: feature.description,
            complexity: feature.complexity,
          });
        },
        error: () => {
          this.error.set("Impossible de charger la fonctionnalité");
        },
      });
      this.projectService.getEstimate(this.featureId).subscribe({
        next: (estimate) => {
          this.estimateId = estimate.id;
          this.form.patchValue({
            hourly_rate: estimate.hourly_rate,
            total_hours: estimate.total_hours,
          });
        },
      });
    });
  }

  submit() {
    this.error.set('');

    const data = this.form.getRawValue();

    this.projectService
      .updateFeature(this.projectId, this.featureId, {
        name: data.name,
        description: data.description,
        complexity: data.complexity,
      })
      .pipe(
        switchMap(() => {
          if (!this.estimateId) return of(null);
          return this.projectService.updateEstimate(this.estimateId, {
            hourly_rate: data.hourly_rate,
            total_hours: data.total_hours,
          });
        }),
      )
      .subscribe({
        next: () => {
          this.notify.success('Fonctionnalité mise à jour');
          this.router.navigate(['/projects', this.projectId]);
        },
        error: (err: any) => {
          this.error.set(err.error?.message || "Erreur lors de la mise à jour");
        },
      });
  }
}