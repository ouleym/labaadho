import { Produit } from './produit';

export interface DetailPanier {
  statut: string;
  quantite: number;
  prixUnitaire: number;
  produit: Produit;
}