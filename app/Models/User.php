<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles() {
        return $this->belongsToMany(Role::class, "user_role");
    }

    public function projects() {
        return $this->hasMany(Project::class);
    }

    public function submittedTickets() {
        return $this->hasMany(Ticket::class, "submitter_id");
    }

    public function assignedTicket() {
        return $this->hasMany(Ticket::class, "developer_id");
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function hasRole($targetRole) {
        $roles = $this->roles;
        foreach($roles as $role) {
            if($role->title == $targetRole) {
                return true;
            }
        }
        return false;
    }
}
