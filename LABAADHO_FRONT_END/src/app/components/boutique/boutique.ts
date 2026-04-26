import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './boutique.html',
  styleUrls: ['./boutique.css']
})
export class BoutiqueComponent implements OnInit {
  produits: Produit[] = [];
  chargement: boolean = true;
  produitSelectionne: Produit | null = null;
  imageSecondaireVisible: boolean = false; // visible uniquement après clic

  constructor(
    private produitService: ProduitService,
    private panierService: PanierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.produitService.obtenirProduits().subscribe({
      next: (reponse: Produit[]) => {
        this.produits = reponse;
        this.chargement = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
        this.chargement = false;
      }
    });
  }

  ouvrirModal(produit: Produit) {
    this.produitSelectionne = produit;
    this.imageSecondaireVisible = false; // réinitialise à chaque ouverture
    document.body.classList.add('modal-open');
  }

  fermerModal() {
  this.produitSelectionne = null;
  document.body.classList.remove('modal-open'); // 🔥 essentiel ! 
  }


  afficherDeuxiemeImage() {
    this.imageSecondaireVisible = true;
  }

  ajouterAuPanier(produit: Produit) {
  if (!produit) return;
  this.panierService.ajouterProduit(produit, 1); // plus besoin de userId
  this.router.navigate(['/panier']);
}

  voirDetails(id: number): void {
    this.router.navigate(['/produit', id]);
  }
}
