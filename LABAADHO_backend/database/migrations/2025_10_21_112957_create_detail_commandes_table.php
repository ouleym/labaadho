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
        Schema::create('detail_commandes', function (Blueprint $table) {
            $table->id();

            // 🔹 Références vers commande et produit
            $table->unsignedBigInteger('commande_id');
            $table->unsignedBigInteger('produit_id');

            // 🔹 Détails de la commande
            $table->integer('quantite');
            $table->double('prixUnitaire', 10, 2);
            $table->double('total', 10, 2)->storedAs('quantite * prixUnitaire'); // calcul automatique

            $table->timestamps();

            // 🔹 Clés étrangères
            $table->foreign('commande_id')->references('id')->on('commandes')->onDelete('cascade');
            $table->foreign('produit_id')->references('id')->on('produits')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_commandes');
    }
};
