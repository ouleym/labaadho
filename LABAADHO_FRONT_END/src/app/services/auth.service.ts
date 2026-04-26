import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Utilisateur } from '../models/utilisateur';

interface AuthResponse {
  message: string;
  access_token: string; 
  user: Utilisateur;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;
  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // ======================================================
  // 🟩 CONNEXION & INSCRIPTION (UTILISATEURS NORMAUX)
  // ======================================================

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(tap(res => this.handleAuthSuccess(res)));
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(tap(res => this.handleAuthSuccess(res)));
  }

  // ======================================================
  // 🟦 CONNEXION ADMIN (INTERFACE SÉPARÉE)
  // ======================================================

  loginAdmin(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/admin/login`, credentials)
      .pipe(tap(res => this.handleAuthSuccess(res)));
  }

  // ======================================================
  // 🟥 DÉCONNEXION
  // ======================================================

  logout(): Observable<any> {
    const token = this.getToken();

    if (!token) {
      this.clearSession();
      return of({ message: 'Aucun token trouvé' });
    }

    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(() => this.clearSession()),
      catchError(() => {
        this.clearSession();
        return of(null);
      })
    );
  }

  // ======================================================
  // 🟫 TRAITEMENT APRÈS LOGIN / REGISTER
  // ======================================================

  private handleAuthSuccess(res: AuthResponse): void {
    const token = res.access_token;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(res.user));

    this.currentUserSubject.next(res.user);
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  // ======================================================
  // 🔍 MÉTHODES DE CONTRÔLE
  // ======================================================

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  getUserId(): number | null {
    return this.getCurrentUser()?.id ?? null;
  }

  getUserName(): string | null {
    return this.getCurrentUser()?.nom ?? null;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  // ======================================================
  // 🆕 AJOUT POUR NAVBAR (NE CHANGE RIEN AU RESTE)
  // ======================================================

  getRole(): string | null {
    return this.getCurrentUser()?.role ?? null;
  }

  isClient(): boolean {
    return this.getRole() === 'client';
  }

  isVisitor(): boolean {
    return !this.isAuthenticated();
  }
}
