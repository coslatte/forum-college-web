<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ForumUsersSeeder extends Seeder
{
    // public function run(): void
    // {
    //     ForumUsersFactory::new()
    //         ->count(10)
    //         ->create();
    // }
    public function run(): void
    {
        DB::table('forum_users')->insert([
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
            [
                'username' => 'Luis',
                'profile_pic' => 'luis.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'María',
                'profile_pic' => 'maria.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Pedro',
                'profile_pic' => 'pedro.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Laura',
                'profile_pic' => 'laura.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Diego',
                'profile_pic' => 'diego.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Sofía',
                'profile_pic' => 'sofia.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Javier',
                'profile_pic' => 'javier.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Elena',
                'profile_pic' => 'elena.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Miguel',
                'profile_pic' => 'miguel.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Lucía',
                'profile_pic' => 'lucia.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Daniel',
                'profile_pic' => 'daniel.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Paula',
                'profile_pic' => 'paula.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Andrés',
                'profile_pic' => 'andres.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Isabel',
                'profile_pic' => 'isabel.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'Fernando',
                'profile_pic' => 'fernando.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
