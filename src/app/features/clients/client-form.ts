import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-client-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './client-form.html',
})
export class ClientForm {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clientService = inject(ClientService);

  readonly form = this.fb.nonNullable.group({
    company_name: ['', Validators.required],
    email: [''],
    phone: [''],
  });

  isEdit = false;
  error = '';

  constructor() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      afterNextRender(() => {
        this.clientService.get(id).subscribe((client) => {
          this.form.patchValue(client);
          this.cdr.markForCheck();
        });
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.error = '';
    const data = this.form.getRawValue();
    const id = this.route.snapshot.params['id'];

    const request = this.isEdit
      ? this.clientService.update(id, data)
      : this.clientService.create(data);

    request.subscribe({
      next: () => this.router.navigate(['/clients']),
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la sauvegarde';
      },
    });
  }
}
