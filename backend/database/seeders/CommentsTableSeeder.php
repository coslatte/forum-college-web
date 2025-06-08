<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('comments')->insert([
      [
        'user' => 'Juan',
        'content' => '¡Excelente artículo!',
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'user' => 'Ana',
        'content' => 'Gracias por la información.',
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'user' => 'Carlos',
        'content' => 'Tengo una duda sobre el tema.',
        'created_at' => now(),
        'updated_at' => now(),
      ],
    ]);
  }
}
