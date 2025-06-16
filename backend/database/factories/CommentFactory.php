<?php

namespace Database\Factories;

use App\Models\ForumUsers;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'forum_users_id' => ForumUsers::factory()->create()->id,
            'content' => $this->faker->sentence,
            'upvotes' => $this->faker->numberBetween(0, 100),
            'downvotes' => $this->faker->numberBetween(0, 20),
        ];
    }
}
