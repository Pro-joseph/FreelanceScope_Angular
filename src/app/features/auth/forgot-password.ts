import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  sent = false;
  error = '';

  submit() {
    if (this.form.invalid) return;
    this.error = '';
    this.authService.forgotPassword(this.form.getRawValue().email).subscribe({
      next: () => (this.sent = true),
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la demande';
      },
    });
  }
}
