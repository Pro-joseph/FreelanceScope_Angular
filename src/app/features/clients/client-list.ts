import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  imports: [RouterLink],
  templateUrl: './client-list.html',
})
export class ClientList {
  private readonly clientService = inject(ClientService);

  readonly clients = signal<Client[]>([]);

  constructor() {
    afterNextRender(() => {
      this.clientService.list().subscribe((c) => this.clients.set(c));
    });
  }
}

interface Client {
  id: number;
  company_name: string;
  email?: string;
  phone?: string;
  projects_count?: number;
  created_at: string;
}