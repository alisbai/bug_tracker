<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class RolesController extends Controller
{
    public function get() {
        
        if (!Gate::allows('access_manage_roles_page')) {
            abort(403);
        }

        return Inertia::render("ManageRoles", [
            "users"=> User::with("roles")->get(),
            "all_roles"=> Role::all()
        ]);

    }

    public function update(Request $request) {
        if(!Gate::allows("access_manage_roles_page")) {
            abort(403);
        }
        $user_roles = $request->input("userRoles");
        $user = User::find($user_roles["userId"]);
        $user->roles()->sync($user_roles["rolesId"]);

        if(Auth::user()->id == $user->id && !$user->hasRole("Admin")) {
            return to_route("dashboard");
        }
        else {
            return to_route("roles.get");
        }
    }
}
