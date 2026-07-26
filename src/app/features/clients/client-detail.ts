import { afterNextRender, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../core/services/client.service';
import type { Client } from '../../core/models';

@Component({
  selector: 'app-client-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './client-detail.html',
})
export class ClientDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly clientService = inject(ClientService);

  readonly client = signal<Client | null>(null);

  constructor() {
    const id = this.route.snapshot.params['id'];
    afterNextRender(() => {
      this.clientService.get(id).subscribe((c) => this.client.set(c));
    });
  }
}
