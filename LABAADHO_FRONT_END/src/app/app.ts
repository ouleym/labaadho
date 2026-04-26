import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PanierService } from './services/panier.service';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterModule, Navbar, Footer],
  providers: [AuthService, PanierService],
})
export class App {

  // ⬇️ Variable qui contrôle l'affichage du navbar + footer
  showPublicLayout: boolean = true;

  constructor(
    public authService: AuthService,
    public panierService: PanierService,
    private router: Router
  ) {

    // ⬇️ Détection de route : si on est dans /admin → cacher navbar + footer
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPublicLayout = !event.url.startsWith('/admin');
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('✅ Déconnexion réussie');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la déconnexion :', err);
      },
    });
  }
}
