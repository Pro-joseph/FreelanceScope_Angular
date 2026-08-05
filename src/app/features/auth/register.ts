import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notify = inject(NotificationService);

  readonly form = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required],
  });

  readonly error = signal('');

  submit() {
    if (this.form.invalid) return;
    if (this.form.getRawValue().password !== this.form.getRawValue().password_confirmation) {
      this.error.set('Les mots de passe ne correspondent pas');
      return;
    }
    this.error.set('');
    this.authService.register(this.form.getRawValue()).subscribe({
      next: () => {
        this.notify.success('Inscription réussie');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error.set(err.error?.message || "Erreur lors de l'inscription");
      },
    });
  }
}
