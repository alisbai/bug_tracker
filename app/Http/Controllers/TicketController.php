<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketGetRequest;
use App\Http\Requests\TicketGetUserTicketRequest;
use App\Models\Project;
use App\Models\Ticket;
use App\Models\TicketPriority;
use App\Models\TicketStatus;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function all() {
        
        $user = Auth::user();

        if ($user->hasRole("Admin")) {
            $ticket = Ticket::select('id','project_id','title','description')->get();
            return Inertia::render("AdminMyTickets", [
                'ticket' => $ticket
            ]);
        } else if($user->hasRole("Developer")){
            $ticket = Ticket::select('id','project_id','title','description')->where('developer_id',$user->id)->get();
            return Inertia::render("DeveloperMyTickets", [
                'ticket' => $ticket
            ]);
        }   
    }

    public function getUserTickets(TicketGetUserTicketRequest $request) {

    }

    public function get(TicketGetRequest $request) {
        $project = Project::find($request->projectId);
        $ticket = Ticket::with(["types", "priorities", "statuses", "submitter", "developer", "comments.user"])->find($request->ticketId);

        return Inertia::render("Ticket", [
            'project' => $project,
            'ticket' => $ticket
        ]);
    }
    
    public function add(Request $request) {

       $ticket = new Ticket();
       $ticket->project_id = $request->project;
       $ticket->submitter_id=Auth::user()->id;
       $ticket->developer_id=$request->developer;
       $ticket->title=$request->title;
       $ticket->description=$request->description;
       $ticket->save();
       $priority = TicketPriority::find($request->priority);
       $type = TicketType::find($request->type);
       $ticket->priorities()->sync($priority);
       $ticket->types()->sync($type);
       return redirect()->back();
    }

}
