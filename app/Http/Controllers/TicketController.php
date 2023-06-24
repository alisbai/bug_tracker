<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketGetRequest;
use App\Http\Requests\TicketGetUserTicketRequest;
use App\Models\Project;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function all() {
        
        $user = Auth::user();

        if ($user->hasRole("Admin")) {
            $ticket = Ticket::select('id','title','description')->get();
            return Inertia::render("AdminMyTickets", [
                'ticket' => $ticket
            ]);
        } else if($user->hasRole("Developer")){
            $ticket = Ticket::select('id','title','description')->where('developer_id',$user->id)->get();
            return Inertia::render("DeveloperMyTickets", [
                'ticket' => $ticket
            ]);
        }   
    }

}
