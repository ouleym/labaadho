import { Component, OnInit, ViewChild } from '@angular/core';
import { PanierService } from '../../services/panier.service';
import { CommandeService, CommandeResponse } from '../../services/commande.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PaiementService } from '../../services/paiement.service';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paiement.html',
  styleUrls: ['./paiement.css']
})
export class PaiementComponent implements OnInit {
  @ViewChild('paiementForm') paiementForm!: NgForm;

  commande: any;
  isLoading = false;
  modePaiement = 'wave';

  facturation = {
    prenom: '',
    nom: '',
    adresse: '',
    complement: '',
    codePostal: '',
    telephone: '',
    email: '',
    notes: ''
  };

  constructor(
    private panierService: PanierService,
    private commandeService: CommandeService,
    private paiementService: PaiementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commande = this.panierService.getCommande();

    if (!this.commande || !this.commande.panier || this.commande.panier.length === 0) {
      console.warn('⚠️ Panier ou commande vide.');
      // Tu peux afficher un message à l'utilisateur et désactiver le bouton "Valider"
      return;
    }
  }

  validerPaiement(form: NgForm) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Vous devez vous connecter pour valider votre commande.");
      this.router.navigate(['/login']);
      return;
    }

    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.facturation.email)) {
      alert('⚠️ Veuillez entrer une adresse email valide');
      return;
    }

    if (this.facturation.telephone.length < 8) {
      alert('⚠️ Veuillez entrer un numéro de téléphone valide');
      return;
    }

    this.isLoading = true;

    const commandeComplete = {
      panier: this.commande.panier,
      facturation: this.facturation,
      modePaiement: this.modePaiement,
      sousTotal: this.commande.sousTotal,
      fraisExpedition: this.commande.fraisExpedition,
      total: this.commande.total,
      notes: this.facturation.notes
    };

    this.commandeService.creerCommande(commandeComplete).subscribe({
      next: (response: CommandeResponse) => {
        this.isLoading = false;
        this.panierService.viderPanier().subscribe();
        this.panierService.clearCommande();

        // 🔹 Redirection avec ID de commande
        if (response && response.id) {
          console.log('Commande créée avec ID :', response.id);
          this.router.navigate(['/order-confirmation', response.id]);
        } else {
          this.router.navigate(['/order-confirmation']);
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Erreur paiement:', error);

        // 🔹 Redirection même en cas d'erreur (pour test)
        this.router.navigate(['/order-confirmation']);
      }
    });
  }

  retourAuPanier(): void {
    this.router.navigate(['/panier']);
  }
}
