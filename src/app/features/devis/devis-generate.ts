import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevisService } from '../../core/services/devis.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-devis-generate',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './devis-generate.html',
})
export class DevisGenerate {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly devisService = inject(DevisService);
  private readonly notify = inject(NotificationService);

  protected readonly projectId = +(this.route.snapshot.params['id'] ?? this.route.parent?.snapshot.params['id']);

  readonly form = this.fb.nonNullable.group({
    conditions: [''],
  });

  error = '';
  loading = false;

  submit() {
    this.loading = true;
    this.error = '';
    this.devisService.generate(this.projectId, this.form.getRawValue().conditions).subscribe({
      next: () => {
        this.notify.success('Devis généré avec succès');
        this.router.navigate(['/projects', this.projectId]);
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de la génération du devis";
        this.loading = false;
      },
    });
  }
}
