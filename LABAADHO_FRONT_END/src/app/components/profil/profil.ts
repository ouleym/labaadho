import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class ProfilComponent implements OnInit {
  utilisateur: Utilisateur | null = null;
  isLoading = true;
  isEditing = false;
  message: string | null = null;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.chargerProfil();
  }

  chargerProfil(): void {
    this.utilisateurService.getProfil().subscribe({
      next: (data) => {
        this.utilisateur = data;
        this.isLoading = false;
      },
      error: () => {
        this.message = "Erreur lors du chargement du profil.";
        this.isLoading = false;
      }
    });
  }

  activerEdition(): void {
    this.isEditing = true;
  }

  sauvegarderProfil(): void {
    if (!this.utilisateur) return;

    this.utilisateurService.mettreAJourProfil(this.utilisateur).subscribe({
      next: (data) => {
        this.utilisateur = data;
        this.isEditing = false;
        this.message = "Profil mis à jour avec succès.";
      },
      error: () => {
        this.message = "Erreur lors de la mise à jour du profil.";
      }
    });
  }
}
