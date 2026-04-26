// src/app/services/utilisateur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Utilisateur } from '../models/utilisateur';

interface DashboardStats {
  total_clients: number;
  total_commandes: number;
  total_produits: number;
  revenu_total: number;
  commandes_en_attente: number;
  nouveaux_clients_mois: number;
  revenu_mois: number;
}

interface RecentOrder {
  id: number;
  utilisateur: {
    nom: string;
    prenom: string;
    email: string;
  };
  total: number;
  statut: string;
  created_at: string;
}

interface TopProduct {
  id: number;
  nom: string;
  prix: number;
  stock: number;
  total_ventes: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = `${environment.apiUrl}/utilisateurs`;
  private adminUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // ============ CLIENT ============
  getProfil(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/profil`);
  }

  mettreAJourProfil(utilisateur: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/profil`, utilisateur);
  }

  // ============ ADMIN ============
  
  // Dashboard Stats
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.adminUrl}/dashboard/stats`);
  }

  getRecentOrders(limit: number = 5): Observable<RecentOrder[]> {
    return this.http.get<RecentOrder[]>(`${this.adminUrl}/dashboard/recent-orders?limit=${limit}`);
  }

  getTopProducts(limit: number = 5): Observable<TopProduct[]> {
    return this.http.get<TopProduct[]>(`${this.adminUrl}/dashboard/top-products?limit=${limit}`);
  }

  // Gestion clients
  getAllClients(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.adminUrl}/clients`);
  }

  // Gestion admins
  getAllAdmins(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.adminUrl}/admins`);
  }

  changeUserRole(userId: number, role: string): Observable<any> {
    return this.http.patch(`${this.adminUrl}/users/${userId}/role`, { role });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/users/${userId}`);
  }
}