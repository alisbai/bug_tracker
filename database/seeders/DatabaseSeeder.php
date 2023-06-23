<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\TicketPriority;
use App\Models\TicketStatus;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(5)->create();
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(TicketPrioritySeeder::class);
        $this->call(TicketTypeSeeder::class);
        $this->call(TicketStatusSeeder::class);
        $this->call(TicketSeeder::class);
        $this->call(CommentSeeder::class);
    }
}
