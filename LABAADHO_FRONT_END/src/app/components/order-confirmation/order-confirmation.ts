import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../../services/paiement.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-confirmation.html',
  styleUrls: ['./order-confirmation.css']
})
export class OrderConfirmationComponent implements OnInit {
  paiementDetails: any;

  constructor(
    private route: ActivatedRoute,
    private paiementService: PaiementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.paiementService.getPaiementById(+id).subscribe({
        next: (data) => (this.paiementDetails = data),
        error: (err) => {
          console.error('Erreur chargement paiement :', err);
          this.router.navigate(['/boutique']);
        }
      });
    } else {
      this.router.navigate(['/boutique']);
    }
  }
}
