<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class RolesController extends Controller
{
    public function get() {
        
        if (!Gate::allows('access_manage_roles_page')) {
            abort(403);
        }

        return Inertia::render("Welcome");

    }
}
