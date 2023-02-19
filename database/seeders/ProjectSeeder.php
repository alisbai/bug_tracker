<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Project::factory()->count(10)->has(User::factory()->count(2))->create();
        $projects = Project::factory()->count(10)->create();
        $users = User::all();
        $projects->each(function($project) use ($users) {
            $project->users()->attach($users->random()->id);
        });
    }
}
