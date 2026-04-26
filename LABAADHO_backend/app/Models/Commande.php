<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $table = 'commandes';

    protected $fillable = [
        'user_id',
        'date',
        'numCommande',
        'total',
        'statut'
    ];

    protected $casts = [
        'date' => 'datetime',
        'total' => 'double'
    ];

    // Relation vers l’utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'user_id', 'id');
    }

    public function detailCommandes()
    {
        return $this->hasMany(DetailCommande::class, 'commande_id');
    }

    public function paiement()
    {
        return $this->hasOne(Paiement::class, 'commande_id');
    }

    public function validerCommande()
    {
        return $this->update(['statut' => 'Validée']);
    }

    public function annulerCommande()
    {
        return $this->update(['statut' => 'Annulée']);
    }

    public function mettreAJourStatut($statut)
    {
        return $this->update(['statut' => $statut]);
    }
}
