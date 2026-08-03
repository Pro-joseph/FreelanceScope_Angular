import { afterNextRender, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface AdminDevis {
  id: number;
  client?: { company_name?: string };
  project?: { name?: string };
  total_amount: number;
  status: string;
  created_at: string;
}

@Component({
  selector: 'app-admin-devis-list',
  imports: [DatePipe],
  templateUrl: './admin-devis-list.html',
})
export class AdminDevisList {
  private readonly http = inject(HttpClient);

  readonly devis = signal<AdminDevis[]>([]);

  constructor() {
    afterNextRender(() => {
      this.http
        .get<{ data: AdminDevis[] }>(`${environment.apiUrl}/admin/devis`)
        .subscribe((res) => this.devis.set(res.data ?? []));
    });
  }
}
