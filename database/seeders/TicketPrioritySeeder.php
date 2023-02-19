<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketPrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("ticket_priorities")->insert([
            ["priority"=> "Low"],
            ["priority" => "Medium"],
            ["priority" => "High"]
        ]);
    }
}
