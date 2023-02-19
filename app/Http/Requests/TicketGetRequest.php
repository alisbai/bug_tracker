<?php

namespace App\Http\Requests;

use App\Models\Project;
use App\Models\Ticket;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class TicketGetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = $this->user();
        $project = Project::find("projectId");
        $ticket = Ticket::find("ticketId");
        if($user->hasRole("Admin")) {
            return true;
        }
        if($user->hasRole("Project Manager") && $user->projects->where("id", $project->id)->exists()) {
            return true;
        }
        if($user->hasRole("Developer") && $ticket->developer->id == $user->id) {
            return true;
        }
        if($user->hasRole("Submitter") && $ticket->submitter->id == $user->id) {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "projectId"=> "required",
            "ticketId" => "required"
        ];
    }
}
