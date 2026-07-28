import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface DashboardStats {
  clients_count: number;
  projects_count: number;
  devis_count: number;
  freelances_count?: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = `${environment.apiUrl}`;

  stats() {
    const isAdmin = this.authService.user()?.role === 'admin';
    const endpoint = isAdmin ? '/admin/dashboard' : '/dashboard/stats';
    return this.http.get<DashboardStats>(`${this.apiUrl}${endpoint}`);
  }
}
