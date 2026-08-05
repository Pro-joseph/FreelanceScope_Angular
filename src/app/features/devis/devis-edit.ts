import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DevisService } from '../../core/services/devis.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-devis-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './devis-edit.html',
})
export class DevisEdit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly devisService = inject(DevisService);
  private readonly notify = inject(NotificationService);

  protected readonly projectId = +(this.route.snapshot.params['id'] ?? this.route.parent?.snapshot.params['id']);
  protected readonly devisId = +this.route.snapshot.params['devisId'];

  readonly form = this.fb.nonNullable.group({
    conditions: [''],
    status: ['draft'],
  });

  error = '';

  constructor() {
    afterNextRender(() => {
      this.devisService.get(this.projectId, this.devisId).subscribe({
        next: (devis) => {
          this.form.patchValue({
            conditions: devis.conditions || '',
            status: devis.status,
          });
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Impossible de charger le devis';
        },
      });
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.error = '';
    this.devisService
      .update(this.projectId, this.devisId, this.form.getRawValue() as any)
      .subscribe({
        next: () => {
          this.notify.success('Devis modifié');
          this.router.navigate(['/projects', this.projectId, 'devis', this.devisId]);
        },
        error: (err) => {
          this.error = err.error?.message || "Erreur lors de la mise à jour";
        },
      });
  }
}
