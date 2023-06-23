<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketGetRequest;
use App\Http\Requests\TicketGetUserTicketRequest;
use App\Models\Project;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function get(TicketGetRequest $request) {
        $project = Project::find($request->projectId);
        $ticket = Ticket::with(["types", "priorities", "statuses", "submitter", "developer", "comments.user"])->find($request->ticketId);

        return Inertia::render("Ticket", [
            'project' => $project,
            'ticket' => $ticket
        ]);
    }

    public function getUserTickets(TicketGetUserTicketRequest $request) {

    }
}
