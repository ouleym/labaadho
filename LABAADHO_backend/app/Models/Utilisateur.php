<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // 🔗 Relations
    public function commandes()
    {
        return $this->hasMany(Commande::class, 'user_id');
    }

    public function panier()
    {
        return $this->hasOne(Panier::class, 'user_id');
    }

    // 🔄 Mettre à jour profil
    public function mettreAJourProfil($donnees)
    {
        return $this->update($donnees);
    }
}
