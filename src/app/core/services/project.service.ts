import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Estimate, Project, ProjectFeature } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  list(params?: { status?: string; client_id?: number }) {
    return this.http
      .get<{ data: Project[] }>(this.apiUrl, { params: params as unknown as Record<string, string | number> })
      .pipe(map(r => r.data));
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

  getFeature(featureId: number) {
    return this.http.get<{ data: ProjectFeature }>(`${environment.apiUrl}/features/${featureId}`).pipe(map(r => r.data));
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

  deleteFeature(featureId: number) {
    return this.http.delete(`${environment.apiUrl}/features/${featureId}`);
  }

  getEstimate(featureId: number) {
    return this.http.get<{ data: Estimate }>(`${environment.apiUrl}/features/${featureId}/estimate`).pipe(map(r => r.data));
  }

  updateEstimate(estimateId: number, data: Partial<Estimate>) {
    return this.http.put<{ data: Estimate }>(`${environment.apiUrl}/estimates/${estimateId}`, data).pipe(map(r => r.data));
  }
}
