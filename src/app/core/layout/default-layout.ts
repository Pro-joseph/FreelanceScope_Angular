import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './default-layout.html',
  styleUrl: './default-layout.css',
})
export class DefaultLayout {
  private readonly authService = inject(AuthService);
  private readonly notify = inject(NotificationService);
  readonly user = this.authService.user;
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly isAdmin = computed(() => this.user()?.role === 'admin');
  readonly sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  logout() {
    this.authService.logout().subscribe({
      complete: () => this.notify.success('Déconnecté'),
    });
  }
}
