<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePokemonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pokemon', function (Blueprint $table) {
            $table->string('id');
            $table->string('name');
            $table->json('types');
            $table->string('height');
            $table->string('weight');
            $table->json('abilities');
            $table->json('eggGroups');
            $table->json('stats');
            $table->string('genus');
            $table->string('description');
            $table->boolean('captured');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pokemon');
    }
}