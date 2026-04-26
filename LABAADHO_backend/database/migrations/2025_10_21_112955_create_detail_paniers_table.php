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
        Schema::create('detail_paniers', function (Blueprint $table) {
            $table->id();

            // 🔹 Clé étrangère vers panier
            $table->unsignedBigInteger('panier_id');
            $table->foreign('panier_id')
                  ->references('id')
                  ->on('paniers')
                  ->onDelete('cascade');

            // 🔹 Produit lié
            $table->unsignedBigInteger('produit_id');
            $table->foreign('produit_id')
                  ->references('id')
                  ->on('produits')
                  ->onDelete('cascade');

            // 🔹 Données de la ligne de commande
            $table->integer('quantite');
            $table->double('prixUnitaire');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_paniers');
    }
};
