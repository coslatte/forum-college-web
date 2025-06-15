<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
  public function run(): void
  {
    $users = DB::table('user')->pluck('id', 'username');

    DB::table('comments')->insert([
      [
        'user_id' => $users['Juan'] ?? null,
        'content' => '¡Excelente artículo!',
        'upvotes' => 10,
        'downvotes' => 0,
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'user_id' => $users['Ana'] ?? null,
        'content' => 'Gracias por la información.',
        'upvotes' => 12,
        'downvotes' => 0,
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'user_id' => $users['Carlos'] ?? null,
        'content' => 'Tengo una duda sobre el tema.',
        'upvotes' => 2,
        'downvotes' => 0,
        'created_at' => now(),
        'updated_at' => now(),
      ],
    ]);
  }
}
