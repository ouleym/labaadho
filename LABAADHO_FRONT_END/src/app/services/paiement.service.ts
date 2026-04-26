import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Paiement } from '../models/paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = `${environment.apiUrl}/paiement`;

  constructor(private http: HttpClient) {}

  // 🟢 Effectuer un paiement (Wave ou espèces)
  effectuerPaiement(paiementData: {
    commande_id: number;
    montant: number;
    modePaiement: 'wave' | 'especes';
  }): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, paiementData);
  }

  // 🟢 Récupérer un paiement via son ID
  getPaiementById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/${id}`);
  }

  // 🟢 Récupérer le paiement lié à une commande
  getPaiementByCommande(commandeId: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/commande/${commandeId}`);
  }
}
