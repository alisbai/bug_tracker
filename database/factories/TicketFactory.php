<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "title" => fake()->name(),
            "description" => fake()->name(),
            "project_id" => Project::all()->random(1)->first()->id,
            "developer_id" => User::inRandomOrder()->whereHas("roles", function($query){
                $query->where("title", "Developer");
            })->first()->id,
            "submitter_id" => User::inRandomOrder()->whereHas("roles", function($query) {
                $query->where("title", "Submitter");
            })->first()->id
        ];
    }
}
