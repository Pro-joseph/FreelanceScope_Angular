export type UserRole = 'admin' | 'freelance';
export type UserStatut = 'actif' | 'inactif';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  telephone?: string;
  statut: UserStatut;
  taux_horaire?: number;
  created_at: string;
  updated_at: string;
}
