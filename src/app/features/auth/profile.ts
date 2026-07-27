import { afterNextRender, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
})
export class Profile {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly notify = inject(NotificationService);

  readonly user = this.authService.user;

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
      const u = this.user();
      if (u) {
        this.form.patchValue({
          nom: u.nom,
          prenom: u.prenom,
          email: u.email,
          telephone: u.telephone || '',
          taux_horaire: u.taux_horaire || 0,
        });
      }
    });
  }

  submit() {
    this.error = '';
    this.http
      .put(`${environment.apiUrl}/freelance/profile`, this.form.getRawValue())
      .subscribe({
        next: (res: any) => {
          const data = res?.data ?? res;
          if (data) {
            this.authService.user.set(data);
          }
          this.notify.success('Profil mis à jour');
        },
        error: (err) => {
          this.error = err.error?.message || "Erreur lors de la sauvegarde";
        },
      });
  }
}