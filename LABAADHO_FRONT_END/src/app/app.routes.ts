import { Routes } from '@angular/router';

// Pages publiques
import { AccueilComponent } from './components/accueil/accueil';
import { BoutiqueComponent } from './components/boutique/boutique';
import { AProposComponent } from './components/a-propos/a-propos';
import { ContactComponent } from './components/contact/contact';

// Panier, produits, profil et commandes (côté client)
import { PanierComponent } from './components/panier/panier';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail';
import { ProfilComponent } from './components/profil/profil';
import { CommandeDetailComponent } from './components/commande-detail/commande-detail';

// Authentification
import { LoginComponent } from './components/login/login';

// Paiement
import { PaiementComponent } from './components/paiement/paiement';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation';

// ADMIN
import { DashboardComponent } from './admin/dashboard/dashboard';
import { ProduitComponent } from './admin/produits/produits';
import { ProduitFormComponent } from './admin/produit-form/produit-form';
import { CommandesComponent } from './admin/commandes/commandes';

export const routes: Routes = [
  // 🏠 PAGES PUBLIQUES
  { path: '', component: AccueilComponent },
  { path: 'boutique', component: BoutiqueComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'contact', component: ContactComponent },

  // 🔐 Authentification
  { path: 'login', component: LoginComponent },

  // 🛒 PANIER
  { path: 'panier', component: PanierComponent },

  // 🧾 PRODUITS (client)
  { path: 'produits', component: BoutiqueComponent },
  { path: 'produits/:id', component: ProduitDetailComponent },

  // 💳 PAIEMENT
  { path: 'paiement', component: PaiementComponent },

  // 🔹 CONFIRMATION COMMANDE
  { path: 'order-confirmation', component: OrderConfirmationComponent },

  // 👤 PROFIL UTILISATEUR
  { path: 'profil', component: ProfilComponent },

  // 📦 COMMANDES UTILISATEUR
  { path: 'commandes/:id', component: CommandeDetailComponent },

  // 🔹 ADMIN (DASHBOARD + PRODUITS + COMMANDES)
  {
    path: 'admin',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'produits', component: ProduitComponent },
      { path: 'produits/ajouter', component: ProduitFormComponent },
      { path: 'produits/modifier/:id', component: ProduitFormComponent },
      { path: 'commandes', component: CommandesComponent }
    ]
  },

  // 🚧 Routes inconnues
  { path: '**', redirectTo: '' }
];
