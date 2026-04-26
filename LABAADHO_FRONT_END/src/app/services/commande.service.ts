import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// 🔹 Interface de réponse (tu peux l’ajuster selon ton backend)
export interface CommandeResponse {
  id: number;
  statut?: string;
  total?: number;
  date?: string;
  nomClient?: string;
  prenomClient?: string;
  methodePaiement?: string;
  produits?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:8000/api/commandes';

  constructor(private http: HttpClient) {}

  // Créer une commande
  creerCommande(data: any): Observable<CommandeResponse> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.post<CommandeResponse>(this.apiUrl, data, { headers });
  }

  // Récupérer toutes les commandes (ADMIN)
  getCommandes(): Observable<CommandeResponse[]> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.get<CommandeResponse[]>(this.apiUrl, { headers });
  }

  // Récupérer une commande par ID (ADMIN + CLIENT)
  getCommandeById(id: number): Observable<CommandeResponse> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.get<CommandeResponse>(`${this.apiUrl}/${id}`, { headers });
  }

  // Récupérer les commandes du client connecté
  getCommandesByClient(): Observable<CommandeResponse[]> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.get<CommandeResponse[]>(`${this.apiUrl}?client=me`, { headers });
  }

  // Récupérer toutes les commandes avec infos client
  getCommandesAvecClient(): Observable<CommandeResponse[]> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    return this.http.get<CommandeResponse[]>(`${this.apiUrl}/commandes-client`, { headers });
  }
}
