import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevisService } from '../../core/services/devis.service';

@Component({
  selector: 'app-devis-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './devis-edit.html',
})
export class DevisEdit implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly devisService = inject(DevisService);

  protected readonly projectId = +this.route.snapshot.params['id'];
  protected readonly devisId = +this.route.snapshot.params['devisId'];

  readonly form = this.fb.nonNullable.group({
    conditions: [''],
    total_amount: [0, Validators.min(0)],
    status: ['draft'],
  });

  error = '';

  ngOnInit() {
    this.devisService.get(this.projectId, this.devisId).subscribe((devis) => {
      this.form.patchValue({
        conditions: devis.conditions || '',
        total_amount: devis.total_amount,
        status: devis.status,
      });
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.error = '';
    this.devisService
      .update(this.projectId, this.devisId, this.form.getRawValue() as any)
      .subscribe({
        next: () => this.router.navigate(['/projects', this.projectId, 'devis', this.devisId]),
        error: (err) => {
          this.error = err.error?.message || "Erreur lors de la mise à jour";
        },
      });
  }
}
