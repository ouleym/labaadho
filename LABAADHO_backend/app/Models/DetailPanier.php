<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPanier extends Model
{
    use HasFactory;
    
    protected $table = 'detail_paniers';
    
    protected $fillable = [
        'panier_id',
        'produit_id',
        'quantite',
        'prixUnitaire'
    ];
    
    protected $casts = [
        'quantite' => 'integer',
        'prixUnitaire' => 'double'
    ];
    
    public function panier()
    {
        return $this->belongsTo(Panier::class, 'panier_id');
    }
    
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }
}
