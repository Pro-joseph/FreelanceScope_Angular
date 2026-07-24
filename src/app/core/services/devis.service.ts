import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Devis } from '../models';

@Injectable({ providedIn: 'root' })
export class DevisService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  list(projectId: number) {
    return this.http.get<{ data: Devis[] }>(`${this.apiUrl}/${projectId}/devis`).pipe(map(r => r.data));
  }

  get(projectId: number, devisId: number) {
    return this.http.get<{ data: Devis }>(`${this.apiUrl}/${projectId}/devis/${devisId}`).pipe(map(r => r.data));
  }

  generate(projectId: number, conditions?: string) {
    return this.http.post<{ data: Devis }>(`${this.apiUrl}/${projectId}/devis`, { conditions }).pipe(map(r => r.data));
  }

  update(projectId: number, devisId: number, data: Partial<Devis>) {
    return this.http.put<{ data: Devis }>(`${this.apiUrl}/${projectId}/devis/${devisId}`, data).pipe(map(r => r.data));
  }

  downloadPdf(projectId: number, devisId: number) {
    return this.http.get(`${this.apiUrl}/${projectId}/devis/${devisId}/pdf`, {
      responseType: 'blob',
    });
  }
}
