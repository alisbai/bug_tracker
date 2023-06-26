<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\TicketController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name("origin");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get("/settings", function() {
    return Inertia::render("Settings");
})->middleware(["auth", "verified"])->name("settings");

Route::middleware('auth')->group(function () {
    Route::get("/manage-roles", [RolesController::class, "get"])->name("roles.get");
    Route::post("/manage-roles", [RolesController::class, "update"])->name("roles.update");
    Route::get("/projects", [ProjectController::class, "index"])->name("projects.index");
    Route::patch("/project-update", [ProjectController::class, "update"])->name("project.update");
    Route::post("/project-add", [ProjectController::class, "add"])->name("project.add");
    Route::get("/project-staff", [ProjectController::class, "users"])->name("project.users");
    Route::post("/project-add-user", [ProjectController::class, "addUser"])->name("project.add.user");
    Route::post("/project-remove-user", [ProjectController::class, "removeUser"])->name("project.remove.user");
    Route::get("/manage-project-staff", [ProjectController::class, "getProjectsToManageStaff"])->name("manageProjectsStaff.get");
    Route::get("/project-tickets", [ProjectController::class, "tickets"])->name("project.tickets");
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get("/ticket", [TicketController::class, "get"])->name("ticket.get");
    Route::post("add-comment", [CommentController::class, "add"])->name("comment.add");
    Route::get("/tickets", [TicketController::class, "all"])->name("tickets.list");
});

require __DIR__.'/auth.php';
