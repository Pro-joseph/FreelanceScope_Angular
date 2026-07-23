export interface AiAnalysis {
  id: number;
  project_id: number;
  prompt: string;
  response?: string;
  model?: string;
  tokens_used?: number;
  created_at: string;
  updated_at: string;
}
