<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories\CommentFactory;

class CommentsSeeder extends Seeder
{
    public function run(): void
    {
        CommentFactory::new()
            ->count(50)
            ->create();
    }
}
