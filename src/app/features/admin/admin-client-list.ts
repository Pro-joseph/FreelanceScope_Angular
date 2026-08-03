import { afterNextRender, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface AdminClient {
  id: number;
  company_name: string;
  email?: string;
  phone?: string;
  projects_count?: number;
  user?: { nom: string; prenom: string };
}

@Component({
  selector: 'app-admin-client-list',
  imports: [],
  templateUrl: './admin-client-list.html',
})
export class AdminClientList {
  private readonly http = inject(HttpClient);

  readonly clients = signal<AdminClient[]>([]);

  constructor() {
    afterNextRender(() => {
      this.http
        .get<{ data: AdminClient[] }>(`${environment.apiUrl}/admin/clients`)
        .subscribe((res) => this.clients.set(res.data ?? []));
    });
  }
}
