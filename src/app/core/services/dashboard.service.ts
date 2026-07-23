import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface DashboardStats {
  clients_count: number;
  projects_count: number;
  devis_count: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/dashboard`;

  stats() {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }
}
