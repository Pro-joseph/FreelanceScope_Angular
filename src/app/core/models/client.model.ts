export interface Client {
  id: number;
  company_name: string;
  email?: string;
  phone?: string;
  projects_count?: number;
  created_at: string;
}
