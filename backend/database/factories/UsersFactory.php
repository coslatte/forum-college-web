<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UsersFactory extends Factory
{
    public function definition(): array
    {
        $username = $this->faker->unique()->userName;

        return [
            'username' => $username,
            'profile_pic' => $this->faker->boolean(30) ? "https://ui-avatars.com/api/?name={$username}&background=0D8ABC&color=fff" : null,
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('created_at', 'now'),
        ];
    }
}
