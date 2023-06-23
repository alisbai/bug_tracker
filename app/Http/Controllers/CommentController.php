<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Ticket;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    
    public function add(Request $request) {

        $comment = new Comment([
            "comment" => $request->input("comment")
        ]);

        $user = $request->user();
        
        $ticket = Ticket::find($request->input("ticketId"));

        $ticket->comments()->save($comment);

        $user->comments()->save($comment);
        
        return back();
    }
}
