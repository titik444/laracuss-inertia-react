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
        Schema::table('answer', function (Blueprint $table) {
            $table->foreignId('discussion_id', 'fk_answer_to_discussion')->references('id')->on('discussion')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreignId('user_id', 'fk_answer_to_users')->references('id')->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('answer', function (Blueprint $table) {
            $table->dropForeign('fk_answer_to_discussion');
            $table->dropForeign('fk_answer_to_users');
        });
    }
};
