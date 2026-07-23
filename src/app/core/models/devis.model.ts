export type DevisStatut = 'draft' | 'sent' | 'accepted' | 'refused';

export interface Devis {
  id: number;
  client: {
    company_name: string;
    email: string;
    phone: string;
  };
  project: {
    name: string;
    description: string;
  };
  features?: Array<{
    name: string;
    description: string;
    complexity: string;
    hourly_rate?: number;
    total_hours?: number;
    total_amount?: number;
  }>;
  total_amount: number;
  conditions?: string;
  status: DevisStatut;
  pdf_path?: string;
  created_at: string;
}
