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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();

            // 🔹 Référence vers la commande
            $table->unsignedBigInteger('commande_id');

            // 🔹 Détails du paiement
            $table->double('montant', 10, 2);
            $table->string('modePaiement'); // ex: carte, espèce, PayPal...
            $table->timestamp('datePaiement')->useCurrent();

            $table->timestamps();

            // 🔹 Clé étrangère vers commandes
            $table->foreign('commande_id')->references('id')->on('commandes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
