import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/';
  isAdminLogin = false; // bascule client/admin

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Redirection après login si query param présent
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  toggleRole(): void {
    this.isAdminLogin = !this.isAdminLogin;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = this.loginForm.value;

    // Choix du service selon le rôle
    const loginRequest = this.isAdminLogin
      ? this.authService.loginAdmin(credentials)
      : this.authService.login(credentials);

    loginRequest.subscribe({
      next: (response: any) => {
        console.log('Connexion réussie:', response);

        // ✅ Stockage du token et de l’utilisateur
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // ✅ Redirection selon le rôle avec comparaison insensible à la casse
        const role = response.user.role?.toLowerCase();
        if (role === 'admin') {
          this.router.navigate(['/admin']); // redirection vers le dashboard admin
        } else {
          this.router.navigate([this.returnUrl]); 
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        this.errorMessage = error.error?.message || 'Email ou mot de passe incorrect';
        this.isLoading = false;
      }
    });
  }
}
