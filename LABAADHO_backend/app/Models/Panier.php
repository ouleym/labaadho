<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;
    
    protected $table = 'paniers';
    
    protected $fillable = [
        'user_id',
        'dateCreation'
    ];
    
    protected $casts = [
        'dateCreation' => 'datetime'
    ];
    
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'user_id');
    }
    
    public function detailPaniers()
    {
        return $this->hasMany(DetailPanier::class, 'panier_id');
    }
    
    public function ajouterProduit($produitId, $quantite, $prixUnitaire)
    {
        return $this->detailPaniers()->create([
            'produit_id' => $produitId,
            'quantite' => $quantite,
            'prixUnitaire' => $prixUnitaire
        ]);
    }
    
    public function supprimerProduit($detailPanierId)
    {
        return $this->detailPaniers()->where('id', $detailPanierId)->delete();
    }
    
    public function viderPanier()
    {
        return $this->detailPaniers()->delete();
    }
    
    public function calculerTotal()
    {
        return $this->detailPaniers->sum(function($detail) {
            return $detail->quantite * $detail->prixUnitaire;
        });
    }
}