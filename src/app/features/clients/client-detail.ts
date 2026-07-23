import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../core/services/client.service';
import type { Client } from '../../core/models';

@Component({
  selector: 'app-client-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './client-detail.html',
})
export class ClientDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly clientService = inject(ClientService);

  client: Client | null = null;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.clientService.get(id).subscribe((c) => (this.client = c));
  }
}
