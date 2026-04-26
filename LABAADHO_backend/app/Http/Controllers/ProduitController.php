<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use Illuminate\Support\Facades\Storage;

class ProduitController extends Controller
{
    public function index()
    {
        $produits = Produit::all()->map(function ($produit) {
            if ($produit->image) {
                // Uniformise le nom de l'image et génère l'URL publique
                $imageName = basename($produit->image);
                $produit->image = asset('storage/produits/' . $imageName);
            }
            return $produit;
        });

        return response()->json($produits);
    }

    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            'quantite' => 'required|integer|min:0',
        ]);

        $produit = new Produit($request->only(['libelle', 'prix', 'description', 'quantite']));

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('produits', 'public');
            $produit->image = basename($path); // Stocke uniquement le nom
        }

        $produit->save();

        return response()->json(['message' => 'Produit ajouté', 'produit' => $produit]);
    }
}
