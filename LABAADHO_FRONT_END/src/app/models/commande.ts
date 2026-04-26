import { DetailCommande } from './detail-commande';
import { Paiement } from './paiement';

export interface Commande {
  id: number;
  dateCommande: Date;
  numCommande: string;
  montantCommande: number;
  statutCommande: 'en_attente' | 'validee' | 'expediee' | 'livree' | 'annulee';
  detailCommandes: DetailCommande[];
  paiement?: Paiement;
  client?: {
    nom: string;
    prenom: string;
  };
}