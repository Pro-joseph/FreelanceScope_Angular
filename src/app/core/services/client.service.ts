import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { Client } from '../models';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/clients`;

  list() {
    return this.http.get<Client[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<Client>) {
    return this.http.post<Client>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Client>) {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
