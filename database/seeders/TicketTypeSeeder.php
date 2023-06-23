<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("ticket_types")->insert([
            ['type' => "Bug Fix"],
            ['type' => "Refactoring"],
            ['type' => "New Feature"]
        ]);
    }
}
