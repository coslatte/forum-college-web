<?php

namespace Database\Seeders;

use App\Models\ForumUsers;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        ForumUsers::factory()
            ->count(5)
            ->create()
            ->each(function ($user) {
                Comment::factory()
                    ->count(3)
                    ->create(['forum_users_id' => $user->id]);
            });
    }
}
