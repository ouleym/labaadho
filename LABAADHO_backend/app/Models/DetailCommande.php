<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailCommande extends Model
{
    use HasFactory;
    
    protected $table = 'detail_commandes';
    
    protected $fillable = [
        'commande_id',
        'produit_id',
        'quantite',
        'prixUnitaire'
    ];
    
    protected $casts = [
        'quantite' => 'integer',
        'prixUnitaire' => 'double'
    ];
    
    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commande_id');
    }
    
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }
    
    public function calculerSousTotal()
    {
        return $this->quantite * $this->prixUnitaire;
    }
}