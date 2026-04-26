import { Component, Input } from '@angular/core';
import { Produit } from '../../models/produit';
import { PanierService } from '../../services/panier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit-detail.html',
  styleUrls: ['./produit-detail.css']
})
export class ProduitDetailComponent {
  @Input() produit!: Produit;
  tailles = ['0', '1', '2', '3', '4'];
  tailleSelectionnee: string = '';

  constructor(private panierService: PanierService) {}

  selectionnerTaille(taille: string) {
    this.tailleSelectionnee = taille;
  }

  ajouterAuPanier(produit: Produit) {
    this.panierService.ajouterProduit(produit);
    alert(`${produit.libelle} a été ajouté au panier !`);
  }
}
