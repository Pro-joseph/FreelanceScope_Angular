import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly user = this.authService.user;

  readonly form = this.fb.nonNullable.group({
    nom: [''],
    prenom: [''],
    email: [''],
    telephone: [''],
    taux_horaire: [0],
  });

  ngOnInit() {
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
  }
}
