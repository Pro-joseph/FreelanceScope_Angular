import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Project, ProjectFeature } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  list(params?: { status?: string; client_id?: number }) {
    return this.http.get<{ data: Project[] }>(this.apiUrl, { params: params as any }).pipe(map(r => r.data));
  }

  get(id: number) {
    return this.http.get<{ data: Project }>(`${this.apiUrl}/${id}`).pipe(map(r => r.data));
  }

  create(data: Partial<Project>) {
    return this.http.post<{ data: Project }>(this.apiUrl, data).pipe(map(r => r.data));
  }

  update(id: number, data: Partial<Project>) {
    return this.http.put<{ data: Project }>(`${this.apiUrl}/${id}`, data).pipe(map(r => r.data));
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFeatures(projectId: number) {
    return this.http.get<{ data: ProjectFeature[] }>(`${this.apiUrl}/${projectId}/features`).pipe(map(r => r.data));
  }

  createFeature(projectId: number, data: Partial<ProjectFeature>) {
    return this.http.post<{ data: ProjectFeature }>(
      `${this.apiUrl}/${projectId}/features`,
      data,
    ).pipe(map(r => r.data));
  }

  updateFeature(projectId: number, featureId: number, data: Partial<ProjectFeature>) {
    return this.http.put<{ data: ProjectFeature }>(
      `${this.apiUrl}/${projectId}/features/${featureId}`,
      data,
    ).pipe(map(r => r.data));
  }
}
