import { afterNextRender, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientService } from '../../core/services/client.service';
import { NotificationService } from '../../shared/services/notification.service';
import type { Client } from '../../core/models';

@Component({
  selector: 'app-client-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './client-detail.html',
})
export class ClientDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clientService = inject(ClientService);
  private readonly notify = inject(NotificationService);

  readonly client = signal<Client | null>(null);

  constructor() {
    const id = this.route.snapshot.params['id'];
    afterNextRender(() => {
      this.clientService.get(id).subscribe((c) => this.client.set(c));
    });
  }

  delete() {
    const client = this.client();
    if (!client) return;
    if (!confirm('Supprimer ce client ? Tous ses projets seront également supprimés.')) return;
    this.clientService.delete(client.id).subscribe({
      next: () => {
        this.notify.success('Client supprimé');
        this.router.navigate(['/clients']);
      },
    });
  }
}
