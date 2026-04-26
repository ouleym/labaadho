import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Produit } from '../models/produit';

export interface LignePanier {
  produit: Produit;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private panierSubject = new BehaviorSubject<LignePanier[]>([]);
  panier$ = this.panierSubject.asObservable();

  private commande: any = null; // Stocke la commande temporairement

  constructor() {}

  // Ajouter un produit au panier
  ajouterProduit(produit: Produit, quantite: number = 1): void {
    const panier = this.panierSubject.value;
    const index = panier.findIndex(item => item.produit.id === produit.id);

    if (index !== -1) {
      panier[index].quantite += quantite;
    } else {
      panier.push({ produit, quantite });
    }

    this.panierSubject.next([...panier]);
  }

  // Modifier la quantité d'un produit
  modifierQuantite(produitId: number, quantite: number): void {
    const panier = this.panierSubject.value.map(item => {
      if (item.produit.id === produitId) item.quantite = quantite;
      return item;
    });
    this.panierSubject.next(panier);
  }

  // Supprimer un produit
  supprimerProduit(produitId: number): void {
    const panier = this.panierSubject.value.filter(item => item.produit.id !== produitId);
    this.panierSubject.next(panier);
  }

  // Vider le panier
  viderPanier(): Observable<void> {
    this.panierSubject.next([]);
    return of();
  }

  // Stocker une commande avant paiement
  setCommande(commande: any): void {
    this.commande = commande;
  }

  // Récupérer la commande avant paiement
  getCommande(): any {
    return this.commande;
  }

  // Effacer la commande après paiement
  clearCommande(): void {
    this.commande = null;
  }
  getNombreArticles(): number {
  return this.panierSubject.value.reduce((total, item) => total + item.quantite, 0);
}

}
