import { Component, OnInit } from '@angular/core';
import { Commande } from '../../models/commande';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './commandes.html',
  styleUrls: ['./commandes.css']
})
export class CommandesComponent implements OnInit {

 commandes: any[] = [
  {
    id: 1,
    numCommande: "CMD001",
    client: { nom: "Diallo", prenom: "Aminata" },
    montantCommande: 65000,
    statutCommande: "en_attente",
    paiement: { modePaiement: "non payé" },
    dateCommande: new Date("2025-11-29 16:02:44"),

    detailCommandes: [
      { quantite: 1 },
      { quantite: 2 }
    ]
  },

  {
    id: 2,
    numCommande: "CMD002",
    client: { nom: "Barry", prenom: "Ousmane" },
    montantCommande: 75000,
    statutCommande: "en_attente",
    paiement: { modePaiement: "payé" },
    dateCommande: new Date("2025-11-29 16:02:44"),

    detailCommandes: [
      { quantite: 3 },
      { quantite: 3 },
      { quantite: 3 }
    ]
  }
];



  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem("token");
  }
}
