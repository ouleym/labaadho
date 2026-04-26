import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const isAuthRoute =
    req.url.includes('/login') ||
    req.url.includes('/register');

  // ⭐ Autoriser les routes du panier sans token
  const isPanierPublic =
    req.url.includes('/panier') ||
    req.url.includes('/cart') ||
    req.url.includes('/add-to-cart');

  // ➤ Si on a un token, on l'ajoute
  if (token && !isAuthRoute) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {

      // ⭐ NE PAS rediriger pour panier invité
      if (isPanierPublic && error.status === 401) {
        return throwError(() => error); // on laisse passer
      }

      if (error.status === 401) {
        authService.logout().subscribe({
          next: () => router.navigate(['/login']),
          error: () => router.navigate(['/login']),
        });
      } else if (error.status === 403) {
        router.navigate(['/']);
      }

      return throwError(() => error);
    })
  );
};
