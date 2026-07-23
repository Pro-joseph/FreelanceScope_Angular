import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService, type DashboardStats } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  stats: DashboardStats | null = null;

  ngOnInit() {
    this.dashboardService.stats().subscribe((s) => (this.stats = s));
  }
}
