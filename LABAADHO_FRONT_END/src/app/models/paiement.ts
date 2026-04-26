export interface Paiement {
  id: number;
  montant: number;
  datePaiement: Date;
  modePaiement: 'carte' | 'paypal' | 'virement' | 'especes';
}