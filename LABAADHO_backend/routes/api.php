<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\Admin\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Routes backend pour "Labaadho".
| Public : accessible sans token.
| Protégé : token requis.
|--------------------------------------------------------------------------
*/

// ========================================
// 👤 AUTHENTIFICATION CLIENT
// ========================================
Route::prefix('auth')->group(function () {
    // 🔓 Routes publiques
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // 🔒 Routes protégées client
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::put('/profil', [AuthController::class, 'MettreAJourProfil']);
        Route::post('/refresh', [AuthController::class, 'refreshToken']);
    });
});

// ========================================
// 🔐 AUTHENTIFICATION ADMIN
// ========================================
Route::prefix('admin')->group(function () {
    // 🔓 Connexion admin publique
    Route::post('/login', [AuthController::class, 'loginAdmin']);

    // 🔒 Routes protégées admin
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {

        // Profil admin
        Route::post('/logout', [AuthController::class, 'logoutAdmin']);
        Route::get('/profile', [AuthController::class, 'getAdminProfile']);
        Route::put('/profile', [AuthController::class, 'updateAdminProfile']);

        /*Dashboard admin
        Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
        Route::get('/dashboard/recent-orders', [DashboardController::class, 'getRecentOrders']);
        Route::get('/dashboard/top-products', [DashboardController::class, 'getTopProducts']);*/

        // Gestion clients
        Route::get('/clients', [AuthController::class, 'listClients']);

        // Gestion produits
        Route::post('/produits', [ProduitController::class, 'store']);
        Route::put('/produits/{id}', [ProduitController::class, 'update']);
        Route::delete('/produits/{id}', [ProduitController::class, 'destroy']);

        // Gestion commandes admin
        Route::get('/commandes', [CommandeController::class, 'indexAdmin']);
        Route::put('/commandes/{id}/statut', [CommandeController::class, 'MettreAJourStatut']);
    });
});

// ========================================
// 🛍️ PRODUITS PUBLICS
// ========================================
Route::get('/produits', [ProduitController::class, 'index']);
Route::get('/produits/{id}', [ProduitController::class, 'show']);

// ========================================
// 🔒 ROUTES PROTÉGÉES CLIENT
// ========================================
Route::middleware('auth:sanctum')->group(function () {

    // 🛒 PANIER
    Route::get('/panier', [PanierController::class, 'index']); 
    Route::post('/panier', [PanierController::class, 'ajouterProduit']); 
    Route::put('/panier/{id}', [PanierController::class, 'modifierQuantite']); 
    Route::delete('/panier/{id}', [PanierController::class, 'supprimerProduit']); 
    Route::delete('/panier', [PanierController::class, 'viderPanier']); 

    // 📦 COMMANDES
    Route::get('/commandes', [CommandeController::class, 'index']);
    Route::post('/commandes', [CommandeController::class, 'store']); 
    Route::get('/commandes/{id}', [CommandeController::class, 'show']);

    // 💳 PAIEMENTS
    Route::post('/paiements', [PaiementController::class, 'store']); 
});
