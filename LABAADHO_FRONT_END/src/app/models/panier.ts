import { DetailPanier } from './detail-panier';

export interface Panier {
  id: number;
  dateCreation: Date;
  detailPaniers: DetailPanier[];
}