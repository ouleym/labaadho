import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) return true;

    // 👉 Afficher le message avant la redirection
    alert("Vous devez vous connecter pour valider votre commande.");

    this.router.navigate(['/login']);
    return false;
  }
}
