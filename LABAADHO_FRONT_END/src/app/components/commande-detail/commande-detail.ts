import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommandeService, CommandeResponse } from '../../services/commande.service';

@Component({
  selector: 'app-commande-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './commande-detail.html',
  styleUrls: ['./commande-detail.css']
})
export class CommandeDetailComponent implements OnInit {
  commande?: CommandeResponse;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCommande(id);
    } else {
      this.errorMessage = 'Commande introuvable';
      this.loading = false;
    }
  }

  loadCommande(id: number): void {
    this.commandeService.getCommandeById(id).subscribe({
      next: (data) => {
        this.commande = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la commande', err);
        this.errorMessage = 'Impossible de charger cette commande';
        this.loading = false;
      }
    });
  }

  retourCommandes(): void {
    this.router.navigate(['/mes-commandes']);
  }
}
