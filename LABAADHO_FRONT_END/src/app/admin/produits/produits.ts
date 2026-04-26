import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produits.html',
  styleUrls: ['./produits.css']
})
export class ProduitComponent implements OnInit {

  produits = [
    {
      id: 1,
      libelle: 'Abaya chemise olive',
      description: 'Abaya élégante style chemise avec ceinture intégrée.',
      prix: 25000,
      image: 'produits/abaya_chemise.webp',
      quantite: 10
    },
    {
      id: 2,
      libelle: 'Abaya noire premium',
      description: 'Abaya noire classique avec un tissu premium.',
      prix: 30000,
      image: 'produits/abaya_noire.webp',
      quantite: 7
    },
    {
      id: 3,
      libelle: 'Abaya papillon beige',
      description: 'Abaya papillon aux manches larges, très confortable.',
      prix: 28000,
      image: 'produits/abaya_papillon_beige.webp',
      quantite: 12
    },
    {
      id: 4,
      libelle: 'Abaya kimono brodée',
      description: 'Abaya style kimono avec broderies dorées.',
      prix: 35000,
      image: 'produits/abaya_kimono_brodee.webp',
      quantite: 5
    },
    {
      id: 5,
      libelle: 'Abaya moderne chocolat',
      description: 'Modèle moderne couleur chocolat, coupe fluide.',
      prix: 27000,
      image: 'produits/abaya_chocolat.webp',
      quantite: 8
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  supprimerProduit(id: number): void {
    this.produits = this.produits.filter(p => p.id !== id);
  }

  allerAjouter(): void {
    this.router.navigate(['/admin/produits/ajouter']);
  }
}
