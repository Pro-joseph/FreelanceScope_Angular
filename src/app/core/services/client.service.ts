import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Client } from '../models';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/clients`;

  list() {
    return this.http.get<{ data: Client[] }>(this.apiUrl).pipe(map(r => r.data));
  }

  get(id: number) {
    return this.http.get<{ data: Client }>(`${this.apiUrl}/${id}`).pipe(map(r => r.data));
  }

  create(data: Partial<Client>) {
    return this.http.post<{ data: Client }>(this.apiUrl, data).pipe(map(r => r.data));
  }

  update(id: number, data: Partial<Client>) {
    return this.http.put<{ data: Client }>(`${this.apiUrl}/${id}`, data).pipe(map(r => r.data));
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
