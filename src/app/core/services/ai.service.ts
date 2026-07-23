import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { AiAnalysis } from '../models';

@Injectable({ providedIn: 'root' })
export class AiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  estimate(projectId: number, prompt: string) {
    return this.http.post<AiAnalysis>(`${this.apiUrl}/${projectId}/ai-estimate`, { prompt });
  }

  getAnalyses(projectId: number) {
    return this.http.get<AiAnalysis[]>(`${this.apiUrl}/${projectId}/ai-analyses`);
  }
}
