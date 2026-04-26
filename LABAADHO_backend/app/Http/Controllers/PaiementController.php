<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paiement;
use App\Models\Commande;

class PaiementController extends Controller
{
    public function effectuerPaiement(Request $request)
    {
        $request->validate([
            'commande_id' => 'required|exists:commandes,id',
            'montant' => 'required|numeric|min:0',
            'modePaiement' => 'required|string'
        ]);

        $commande = Commande::findOrFail($request->commande_id);

        $paiement = Paiement::create([
            'commande_id' => $commande->id,
            'montant' => $request->montant,
            'datePaiement' => now(),
            'modePaiement' => $request->modePaiement
        ]);

        $commande->update(['statutCommande' => 'payée']);

        return response()->json(['message' => 'Paiement effectué', 'paiement' => $paiement]);
    }
}
