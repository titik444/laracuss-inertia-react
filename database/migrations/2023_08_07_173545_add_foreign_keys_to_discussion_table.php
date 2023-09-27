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
        Schema::table('discussion', function (Blueprint $table) {
            $table->foreignId('category_id', 'fk_discussion_to_category')->references('id')->on('category')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreignId('user_id', 'fk_discussion_to_users')->references('id')->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('discussion', function (Blueprint $table) {
            $table->dropForeign('fk_discussion_to_category');
            $table->dropForeign('fk_discussion_to_users');
        });
    }
};
