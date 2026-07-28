import { afterNextRender, Component, inject, signal } from '@angular/core';
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

  readonly stats = signal<DashboardStats | null>(null);

  constructor() {
    afterNextRender(() => {
      this.dashboardService.stats().subscribe((s) => this.stats.set(s));
    });
  }
}
