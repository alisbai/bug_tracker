<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket_ticket_priority', function (Blueprint $table) {
            $table->id();
            $table->foreignId("ticket_id")->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId("priority_id")->constrained("ticket_priorities")->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_ticket_priority');
    }
};
