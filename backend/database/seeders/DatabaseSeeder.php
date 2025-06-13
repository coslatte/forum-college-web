<?php

namespace Database\Seeders;

use App\Models\Users;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Users::factory()
            ->count(5)
            ->hasComments(3)
            ->create();

        // $this->call([
        //     CommentsTableSeeder::class
        // ]);
    }
}
