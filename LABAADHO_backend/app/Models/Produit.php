<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    
    protected $table = 'produits';
    
    protected $fillable = [
        'libelle',
        'prix',
        'description',
        'quantite',
        'image',
        'couleur',
    ];
    
    protected $casts = [
        'prix' => 'double',
        'quantite' => 'integer',
        'couleur' => 'array', // 🔥 pour renvoyer un vrai tableau JSON à Angular
    ];

    // 🔥 AJOUT ESSENTIEL : Génère automatiquement l’URL complète de l’image
    public function getImageAttribute($value)
    {
        return asset('storage/produits/' . $value);
    }
    
    public function detailCommandes()
    {
        return $this->hasMany(DetailCommande::class, 'produit_id');
    }
    
    public function detailPaniers()
    {
        return $this->hasMany(DetailPanier::class, 'produit_id');
    }
    
    public function ajouterAuPanier($panierId, $quantite)
    {
        return DetailPanier::create([
            'panier_id' => $panierId,
            'produit_id' => $this->id,
            'quantite' => $quantite,
            'prixUnitaire' => $this->prix,
        ]);
    }
    
    public function modifierQuantite($nouvelleQuantite)
    {
        return $this->update(['quantite' => $nouvelleQuantite]);
    }
}
