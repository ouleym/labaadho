<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panier;
use App\Models\DetailPanier;
use App\Models\Produit;

class PanierController extends Controller
{
    // Afficher le contenu du panier
    public function index($userId)
    {
        // Charger le panier avec les détails et les produits
        $panier = Panier::with('detailPaniers.produit')
                        ->where('utilisateur_id', $userId)
                        ->first();

        if (!$panier) {
            // Crée un panier vide si aucun panier existant
            $panier = Panier::create([
                'utilisateur_id' => $userId,
                'dateCreation' => now()
            ]);
            $panier->load('detailPaniers.produit');
        }

        return response()->json($panier);
    }

    // Ajouter un produit au panier
    public function ajouterProduit(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'produit_id' => 'required|exists:produits,id',
            'quantite' => 'required|integer|min:1'
        ]);

        $panier = Panier::firstOrCreate(['utilisateur_id' => $request->utilisateur_id]);

        $produit = Produit::findOrFail($request->produit_id);

        // Ajoute ou met à jour la quantité
        $detail = DetailPanier::updateOrCreate(
            [
                'panier_id' => $panier->id,
                'produit_id' => $produit->id
            ],
            [
                'quantite' => $request->quantite,
                'prixUnitaire' => $produit->prix,
                'statut' => 'en cours'
            ]
        );

        // Retourne le panier complet mis à jour
        $panier->load('detailPaniers.produit');
        return response()->json($panier);
    }

    // Supprimer un produit du panier
    public function supprimerProduit($detailId, $userId)
    {
        $detail = DetailPanier::findOrFail($detailId);
        $detail->delete();

        // Retourne le panier mis à jour
        $panier = Panier::with('detailPaniers.produit')
                        ->where('utilisateur_id', $userId)
                        ->first();

        return response()->json($panier);
    }

    // Vider le panier
    public function viderPanier($userId)
    {
        $panier = Panier::where('utilisateur_id', $userId)->first();

        if ($panier) {
            $panier->detailPaniers()->delete();
        }

        $panier->load('detailPaniers.produit');
        return response()->json($panier);
    }

    // Calculer le total du panier
    public function calculerTotal($userId)
    {
        $panier = Panier::with('detailPaniers')->where('utilisateur_id', $userId)->first();

        if (!$panier) {
            return response()->json(['total' => 0]);
        }

        $total = $panier->calculerTotal();
        return response()->json(['total' => $total]);
    }
}
