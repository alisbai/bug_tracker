<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\TicketPriority;
use App\Models\TicketStatus;
use App\Models\TicketType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tickets = Ticket::factory()->count(10)->create();
        $priorities = TicketPriority::all();
        $types = TicketType::all();
        $statuses = TicketStatus::all();
        $tickets->each(function($ticket) use ($priorities, $types, $statuses) {
            $ticket->types()->attach("1");
            $ticket->statuses()->attach("1");
            $ticket->priorities()->attach("1");
        });
    }
}
