import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService, LignePanier } from '../../services/panier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panier.html',
  styleUrls: ['./panier.css']
})
export class PanierComponent implements OnInit {
  isLoading: boolean = true;
  panier: LignePanier[] = [];
  sousTotal = 0;
  fraisExpedition = 2000;
  total = 0;

  constructor(private panierService: PanierService, private router: Router) {}

  ngOnInit(): void {
    this.panierService.panier$.subscribe(panier => {
      this.panier = panier;
      this.calculerTotals();
      this.isLoading = false;
    });
  }

  calculerTotals(): void {
    this.sousTotal = this.panier.reduce(
      (sum, item) => sum + item.produit.prix * item.quantite,
      0
    );
    this.total = this.sousTotal + this.fraisExpedition;
  }

  modifierQuantite(produitId: number, quantite: number): void {
    this.panierService.modifierQuantite(produitId, quantite);
  }

  supprimerProduit(produitId: number): void {
    this.panierService.supprimerProduit(produitId);
  }

  viderPanier(): void {
    this.panierService.viderPanier();
  }

  continuerAchats(): void {
    this.router.navigate(['/boutique']);
  }

  passerCommande(): void {
  // Sauvegarde la commande avant de rediriger
  this.panierService.setCommande({
    panier: this.panier,
    sousTotal: this.sousTotal,
    fraisExpedition: this.fraisExpedition,
    total: this.total
  });

  // Redirection vers paiement
  this.router.navigate(['/paiement']);
}

}
