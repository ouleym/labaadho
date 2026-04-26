import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { ProduitService } from '../../services/produit.service';
import { Commande } from '../../models/commande';
import { Produit } from '../../models/produit';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  searchTerm: string = '';
  commandes: Commande[] = [];
  produits: Produit[] = [];
  statCards: { label: string, value: string }[] = [];
  router: any;
  authService: any;

  constructor(
    private commandeService: CommandeService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
    this.loadProduits();
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
  loadCommandes() {
    this.commandeService.getCommandes().subscribe({
      next: (data: any[]) => {
        this.commandes = data.map(d => ({
          id: d.id,
          dateCommande: new Date(d.dateCommande),
          numCommande: d.numCommande,
          montantCommande: d.montantCommande,
          statutCommande: d.statutCommande,
          detailCommandes: d.detailCommandes,
          paiement: d.paiement
        }));
        this.calculateStats();
      },
      error: (err) => console.error('Erreur chargement commandes', err)
    });
  }

  loadProduits() {
    this.produitService.obtenirProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.calculateStats();
      },
      error: (err) => console.error('Erreur chargement produits', err)
    });
  }

  calculateStats() {
    const totalCommandes = this.commandes.length;
    const commandesLivrees = this.commandes.filter(c => c.statutCommande === 'livree').length;
    const commandesEnAttente = this.commandes.filter(c => c.statutCommande === 'en_attente').length;
    const montantTotal = this.commandes.reduce((sum, c) => sum + c.montantCommande, 0);
    const montantLivres = this.commandes
      .filter(c => c.statutCommande === 'livree')
      .reduce((sum, c) => sum + c.montantCommande, 0);
    const montantEnAttente = montantTotal - montantLivres;

    const totalProduits = this.produits.length;
    const stockTotal = this.produits.reduce((sum, p) => sum + p.quantite, 0);

    this.statCards = [
      { label: 'Commandes totales', value: totalCommandes.toString() },
      { label: 'Commandes livrées', value: commandesLivrees.toString() },
      { label: 'Commandes en attente', value: commandesEnAttente.toString() },
      { label: 'Montant total', value: montantTotal.toLocaleString() + ' FCFA' },
      { label: 'Montant livrés', value: montantLivres.toLocaleString() + ' FCFA' },
      { label: 'Montant en attente', value: montantEnAttente.toLocaleString() + ' FCFA' },
      { label: 'Total produits', value: totalProduits.toString() },
      { label: 'Stock total', value: stockTotal.toString() },
    ];
  }

  // Filtrer commandes par numéro ou libellé des produits
  get filteredCommandes(): Commande[] {
  if (!this.searchTerm) return this.commandes;
  return this.commandes.filter(c =>
    c.numCommande.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    c.detailCommandes.some(d =>
      d.produit.libelle?.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  );
}

  // Filtrer produits par libelle
  get filteredProduits(): Produit[] {
    if (!this.searchTerm) return this.produits;
    return this.produits.filter(p =>
      p.libelle.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
