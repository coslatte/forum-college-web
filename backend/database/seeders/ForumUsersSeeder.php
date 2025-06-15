<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories\ForumUsersFactory;

class ForumUsersSeeder extends Seeder
{
    public function run(): void
    {
        ForumUsersFactory::new()
            ->count(10)
            ->create();
    }
}
