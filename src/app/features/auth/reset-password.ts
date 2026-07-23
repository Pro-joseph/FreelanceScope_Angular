import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly form = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required],
  });

  error = '';

  submit() {
    if (this.form.invalid) return;
    const { password, password_confirmation } = this.form.getRawValue();
    if (password !== password_confirmation) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.error = '';
    const token = this.route.snapshot.params['token'];
    this.authService.resetPassword(token, password, password_confirmation).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la réinitialisation';
      },
    });
  }
}
