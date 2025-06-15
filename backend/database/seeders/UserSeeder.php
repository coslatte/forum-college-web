<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('user')->insert([
            [
                'username' => 'Juan',
                'profile_pic' => 'juan.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Ana',
                'profile_pic' => 'ana.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Carlos',
                'profile_pic' => 'carlos.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
