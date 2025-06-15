<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create("comments", function (Blueprint $table) {
            $table->increments("id");
            $table->string("content", 1024);
            $table->unsignedInteger("upvotes")->default(0);
            $table->unsignedInteger("downvotes")->default(0);
            $table->foreignId('forum_users_id')->constrained('forum_users')->onDelete('cascade');
            $table->index('forum_users_id');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
