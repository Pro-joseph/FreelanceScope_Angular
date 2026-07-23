import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { Project, ProjectFeature } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  list(params?: { status?: string; client_id?: number }) {
    return this.http.get<Project[]>(this.apiUrl, { params: params as any });
  }

  get(id: number) {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<Project>) {
    return this.http.post<Project>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Project>) {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFeatures(projectId: number) {
    return this.http.get<ProjectFeature[]>(`${this.apiUrl}/${projectId}/features`);
  }

  updateFeature(projectId: number, featureId: number, data: Partial<ProjectFeature>) {
    return this.http.put<ProjectFeature>(
      `${this.apiUrl}/${projectId}/features/${featureId}`,
      data,
    );
  }
}
