<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();

            // 🔹 Référence vers le client (utilisateur)
            $table->unsignedBigInteger('user_id');

            // 🔹 Informations de la commande
            $table->string('numCommande')->unique(); // ex: CMD20251128
            $table->double('total', 10, 2)->default(0);       // anciennement montantCommande
            $table->string('statut')->default('en attente');  // anciennement statutCommande
            $table->timestamp('date')->useCurrent();          // anciennement dateCommande

            $table->timestamps();

            // 🔹 Clé étrangère vers la table users
            $table->foreign('user_id')->references('id')->on('utilisateurs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
