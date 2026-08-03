import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService, type DashboardStats } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly dashboardService = inject(DashboardService);
  readonly authService = inject(AuthService);

  readonly isAdmin = computed(() => this.authService.user()?.role === 'admin');

  readonly stats = signal<DashboardStats | null>(null);

  constructor() {
    afterNextRender(() => {
      this.dashboardService.stats().subscribe((s) => this.stats.set(s));
    });
  }

  openTelescope() {
    const win = window.open('', '_blank');
    this.authService.authorizeTelescope().subscribe({
      next: () => win && (win.location.href = '/telescope'),
      error: () => win?.close(),
    });
  }
}
