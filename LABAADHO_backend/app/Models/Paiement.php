<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;
    
    protected $table = 'paiements';
    
    protected $fillable = [
        'commande_id',
        'montant',
        'datePaiement',
        'modePaiement'
    ];
    
    protected $casts = [
        'montant' => 'double',
        'datePaiement' => 'datetime'
    ];
    
    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commande_id');
    }
    
    public function effectuerPaiement()
    {
        return $this->save();
    }
}