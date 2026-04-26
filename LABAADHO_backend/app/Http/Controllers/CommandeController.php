<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\DetailCommande;
use App\Models\Panier;

class CommandeController extends Controller
{
    /**
     * Méthode appelée par POST /api/commandes
     * (celle que ton front essaie d'utiliser)
     */
    public function store(Request $request)
    {
        // Récupérer l'utilisateur authentifié
        $user_id = auth()->id();

        // Récupérer le panier avec les détails et produits
        $panier = Panier::with('details.produit')
            ->where('user_id', $user_id)
            ->first();

        if (!$panier || $panier->details->isEmpty()) {
            return response()->json([
                'message' => 'Le panier est vide'
            ], 400);
        }

        // Créer la commande dans une transaction
        $commande = \DB::transaction(function () use ($panier, $user_id) {
            $commande = Commande::create([
                'user_id' => $user_id,
                'date' => now(),
                'numCommande' => 'CMD-' . time(),
                'total' => $panier->calculerTotal(),
                'statut' => 'en attente',
            ]);

            // Copier les détails du panier vers la commande
            foreach ($panier->details as $item) {
                DetailCommande::create([
                    'commande_id' => $commande->id,
                    'produit_id' => $item->produit_id,
                    'quantite' => $item->quantite,
                    'prixUnitaire' => $item->prixUnitaire,
                ]);
            }

            // Vider le panier
            $panier->details()->delete();

            return $commande;
        });

        // Charger les infos client
        $commande->load('utilisateur');

        // Retourner la réponse prête pour Angular
        return response()->json([
            'id' => $commande->id,
            'numCommande' => $commande->numCommande,
            'total' => $commande->total,
            'statut' => $commande->statut,
            'date' => $commande->date->format('Y-m-d H:i'),
            'nomClient' => $commande->utilisateur->nom,
            'prenomClient' => $commande->utilisateur->prenom,
        ]);
    }



    /**
     * Valider commande (ancienne méthode — toujours utilisable si tu veux)
     */
    public function validerCommande(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:utilisateurs,id',
        ]);

        $panier = Panier::with('details.produit')
            ->where('user_id', $request->utilisateur_id)
            ->firstOrFail();

        $commande = Commande::create([
            'user_id' => $request->utilisateur_id,
            'date' => now(),
            'numCommande' => 'CMD-' . time(),
            'total' => $panier->calculerTotal(),
            'statut' => 'en attente'
        ]);

        foreach ($panier->details as $item) {
            DetailCommande::create([
                'commande_id' => $commande->id,
                'produit_id' => $item->produit_id,
                'quantite' => $item->quantite,
                'prixUnitaire' => $item->prixUnitaire,
            ]);
        }

        $panier->details()->delete();

        return response()->json(['message' => 'Commande validée', 'commande' => $commande]);
    }

    public function annulerCommande($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->update(['statutCommande' => 'annulée']);
        return response()->json(['message' => 'Commande annulée']);
    }
    public function getCommandesAvecClient()
    {
        // Récupérer toutes les commandes avec l'utilisateur lié
        $commandes = Commande::with('utilisateur')
            ->orderBy('dateCommande', 'desc')
            ->get();

        // Transformer pour renvoyer seulement les infos utiles
        $result = $commandes->map(function($cmd) {
            return [
                'id' => $cmd->id,
                'numCommande' => $cmd->numCommande,
                'montantCommande' => $cmd->montantCommande,
                'statutCommande' => $cmd->statutCommande,
                'dateCommande' => $cmd->dateCommande->format('Y-m-d H:i'),
                'nomClient' => $cmd->utilisateur->nom,
                'prenomClient' => $cmd->utilisateur->prenom,
            ];
        });

        return response()->json($result);
    }

    public function mettreAJourStatut(Request $request, $id)
    {
        // Valider le statut envoyé
        $request->validate([
            'statutCommande' => 'required|in:en attente,confirmée,expédiée,livrée,annulée',
        ]);

        // Récupérer la commande
        $commande = Commande::findOrFail($id);

        // Mettre à jour le statut
        $commande->update([
            'statutCommande' => $request->statutCommande
        ]);

        return response()->json([
            'message' => 'Statut de la commande mis à jour avec succès',
            'commande' => $commande
        ]);
    }

}
