import type { Estimate } from './estimate.model';

export type Complexity = 'simple' | 'moyen' | 'complexe';

export interface ProjectFeature {
  id: number;
  project_id: number;
  name: string;
  description?: string;
  complexity?: Complexity;
  created_at: string;
  estimate?: Estimate;
}
