import { Produit } from './produit';

export interface DetailCommande {
  quantite: number;
  prixUnitaire: number;
  produit: Produit;
}