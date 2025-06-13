<?php

namespace Database\Factories;

use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'content' => $this->faker->sentence,
            'upvotes' => $this->faker->numberBetween(0, 100),
            'downvotes' => $this->faker->numberBetween(0, 20),
            'users_id' => Users::factory(),
        ];
    }
}

