import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = `${environment.apiUrl}/produits`;

  constructor(private http: HttpClient) {}

  obtenirProduits(): Observable<Produit[]> {
  return this.http.get<Produit[]>(this.apiUrl).pipe(
    map(produits =>
      produits.map(p => {
        if (p.image) {
          const fileName = p.image.split('/').pop();
          p.image = `http://localhost:8000/storage/produits/${fileName}`;
        }
        return p;
      })
    )
  );
}

obtenirProduitParId(id: number): Observable<Produit> {
  return this.http.get<Produit>(`${this.apiUrl}/${id}`).pipe(
    map(p => {
      if (p.image) {
        const fileName = p.image.split('/').pop();
        p.image = `http://localhost:8000/storage/produits/${fileName}`;
      }
      return p;
    })
  );
}


  /** 🔹 Créer un nouveau produit (admin) */
  creerProduit(produit: FormData): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  /** 🔹 Modifier un produit existant (admin) */
  modifierProduit(id: number, produit: Partial<Produit>): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }

  /** 🔹 Supprimer un produit (admin) */
  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** 🔹 Mettre à jour la quantité (optionnel) */
  modifierQuantite(id: number, quantite: number): Observable<Produit> {
    return this.http.patch<Produit>(`${this.apiUrl}/${id}/quantite`, { quantite });
  }

  /** 🔹 Uploader une image pour un produit */
  televerserImage(id: number, image: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/${id}/image`, formData);
  }
}
