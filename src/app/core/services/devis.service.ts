import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { Devis } from '../models';

@Injectable({ providedIn: 'root' })
export class DevisService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  list(projectId: number) {
    return this.http.get<Devis[]>(`${this.apiUrl}/${projectId}/devis`);
  }

  get(projectId: number, devisId: number) {
    return this.http.get<Devis>(`${this.apiUrl}/${projectId}/devis/${devisId}`);
  }

  generate(projectId: number, conditions?: string) {
    return this.http.post<Devis>(`${this.apiUrl}/${projectId}/devis`, { conditions });
  }

  update(projectId: number, devisId: number, data: Partial<Devis>) {
    return this.http.put<Devis>(`${this.apiUrl}/${projectId}/devis/${devisId}`, data);
  }

  downloadPdf(projectId: number, devisId: number) {
    return this.http.get(`${this.apiUrl}/${projectId}/devis/${devisId}/pdf`, {
      responseType: 'blob',
    });
  }
}
