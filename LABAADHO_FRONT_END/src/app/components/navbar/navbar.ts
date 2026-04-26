import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { AuthService } from '../../services/auth.service';
import { Utilisateur } from '../../models/utilisateur';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

  nombreArticles = 0;
  currentUser: Utilisateur | null = null;

  constructor(
    public panierService: PanierService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nombreArticles = this.panierService.getNombreArticles();
    this.panierService.panier$.subscribe(() => {
      this.nombreArticles = this.panierService.getNombreArticles();
    });

    // 🔹 Écouter les changements d'utilisateur
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  get isAdmin() {
    return this.currentUser?.role === 'admin';
  }

  get isClient() {
    return this.currentUser?.role === 'client';
  }

  get isVisitor() {
    return !this.currentUser;
  }
}
