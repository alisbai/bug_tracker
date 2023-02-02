<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function get(Request $request) {
        $user = $request->user();
        if($user->hasRole("Admin")) {
            $allProjects = Project::all();
            return Inertia::render("ManageProjectsStaffAsAdmin", [
                "allProjects"=> $allProjects
            ]);
        } elseif($user->hasRole("Project Manager")) {
            dd("By");
        } else {
            abort(403);
        }
    }
}
