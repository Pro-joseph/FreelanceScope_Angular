import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../shared/services/notification.service';
import type { User } from '../../core/models';

@Component({
  selector: 'app-freelance-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './freelance-edit.html',
})
export class FreelanceEdit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly notify = inject(NotificationService);

  private readonly id = +this.route.snapshot.params['id'];

  readonly form = this.fb.nonNullable.group({
    nom: [''],
    prenom: [''],
    email: [''],
    telephone: [''],
    taux_horaire: [0],
  });

  error = '';

  constructor() {
    afterNextRender(() => {
      this.http.get<User>(`${environment.apiUrl}/admin/freelances/${this.id}`).subscribe((f) => {
        this.form.patchValue(f);
        this.cdr.markForCheck();
      });
    });
  }

  submit() {
    this.error = '';
    this.http
      .put(`${environment.apiUrl}/admin/freelances/${this.id}`, this.form.getRawValue())
      .subscribe({
        next: () => {
          this.notify.success('Freelance modifié');
          this.router.navigate(['/admin/freelances']);
        },
        error: (err) => {
          this.error = err.error?.message || "Erreur lors de la mise à jour";
        },
      });
  }
}
