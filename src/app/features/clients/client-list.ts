import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClientService } from '../../core/services/client.service';
import type { Client } from '../../core/models';

@Component({
  selector: 'app-client-list',
  imports: [RouterLink],
  templateUrl: './client-list.html',
})
export class ClientList implements OnInit {
  private readonly clientService = inject(ClientService);

  clients: Client[] = [];

  ngOnInit() {
    this.clientService.list().subscribe((c) => (this.clients = c));
  }
}
