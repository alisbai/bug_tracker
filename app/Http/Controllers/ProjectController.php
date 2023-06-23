<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectTicketsRequest;
use App\Http\Requests\ProjectUpdateRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Symfony\Component\Console\Input\Input;

class ProjectController extends Controller
{
    public function index(Request $request) {
        if(Gate::allows("view_projects_as_admin")) {
            return Inertia::render("AdminProjects", ["projects" => Project::all()]);
        } elseif (Gate::allows("view_projects_as_project_manager")) {
            $projectManager = Auth::user();
            return Inertia::render("ProjectManagerProjects", ["projects" => $projectManager->projects]);
        } else {
            abort(403);
        }
    }

    public function update(ProjectUpdateRequest $request) {
        if(!Gate::allows("edit_project_info")) {
            abort(403);
        }
        $project = Project::find($request->id);
        $project->name = $request->name;
        $project->description = $request->description;
        $project->save();
        return redirect()->route("projects.index");
    }

    public function getProjectsToManageStaff(Request $request) {
        $user = $request->user();
        if($user->hasRole("Admin")) {
            $allProjects = Project::all();
            return Inertia::render("ManageProjectsStaff", [
                "allProjects"=> $allProjects
            ]);
        } elseif($user->hasRole("Project Manager")) {
            $projectAssignedToProjectManager = $user->projects;
            // dd($projectAssignedToProjectManager);
            return Inertia::render("ManageProjectsStaff", [
                "allProjects" => $projectAssignedToProjectManager
            ]);
        } else {
            abort(403);
        }
    }

    public function users(Request $request) {
        $projectId = $request->input("projectId");
        $project = Project::with("users.roles")->find($projectId);
        if(!Gate::allows("manage_project_staff", $project)) {
            abort(403);
        }
        
        $ProjectManagersToAddToProject = User::whereDoesntHave("projects", function(Builder $query) use ($projectId) {
            $query->where("project_id", $projectId);
        })->whereHas("roles", function(Builder $query){
            $query->where("title", "Project Manager");
        })->with("roles")->get();

        $RegularStaffToAddToProject = User::whereDoesntHave("projects", function(Builder $query) use ($projectId) {
            $query->where("project_id", $projectId);
        })->whereDoesntHave("roles", function(Builder $query){
            $query->where("title", "Project Manager");
        })->whereDoesntHave("roles", function(Builder $query){
            $query->where("title", "Admin");
        })->with("roles")->get();

        return Inertia::render("ProjectStaff", [
            "project" => $project,
            "projectManagersToAddToProject" => $ProjectManagersToAddToProject,
            "regularStaffToAddToProject" => $RegularStaffToAddToProject
        ]);
    }

    public function addUser(Request $request) {
        $projectId = $request->input("projectId");
        $project = Project::find($projectId);
        if(!Gate::allows("manage_project_staff", $project)) {
            abort(403);
        }

        $userId = $request->input("userId");
        $project->users()->attach($userId);
        return redirect()->route("project.users", ["projectId" => $projectId]);
    }

    public function removeUser(Request $request) {
        
        $projectId = $request->input("projectId");
        $project = Project::find($projectId);
        if(!Gate::allows("manage_project_staff", $project)) {
            abort(403);
        }

        $userId = $request->input("userId");
        $project->users()->detach($userId);
        //if a project manager detaches themselves, redirect to dashboard
        if($request->user()->hasRole("Project Manager") 
        && !$request->user()->hasRole("Admin")
        && $request->user()->id == $userId
        ) {
            return redirect()->route("dashboard");
        }
        return redirect()->route("project.users", ["projectId" => $projectId]);
    }

    public function tickets(ProjectTicketsRequest $request) {
        $project = Project::find($request->projectId);
        $tickets = $project->tickets;

        return Inertia::render("ProjectTickets", [
            "project" => $project,
            "tickets" => $tickets
        ]);
        
    }
}
