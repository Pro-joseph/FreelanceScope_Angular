import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DevisService } from '../../core/services/devis.service';

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

  protected readonly projectId = +this.route.snapshot.params['id'];

  readonly form = this.fb.nonNullable.group({
    conditions: [''],
  });

  error = '';
  loading = false;

  submit() {
    this.loading = true;
    this.error = '';
    this.devisService.generate(this.projectId, this.form.getRawValue().conditions).subscribe({
      next: (devis) => {
        this.router.navigate(['/projects', this.projectId, 'devis', devis.id]);
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de la génération du devis";
        this.loading = false;
      },
    });
  }
}
