import type { Client } from './client.model';
import type { ProjectFeature } from './project-feature.model';

export interface Project {
  id: number;
  client_id: number;
  name: string;
  description?: string;
  status: string;
  features_count?: number;
  created_at: string;
  client?: Client;
  features?: ProjectFeature[];
}
