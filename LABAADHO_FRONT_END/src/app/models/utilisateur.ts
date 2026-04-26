export interface Utilisateur {
  prenom: any;
  id: number;
  nom: string;
  email: string;
  motDePasse?: string;
  adresse: string;
  telephone: number;
  role: 'client' | 'admin';
}