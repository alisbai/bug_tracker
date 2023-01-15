<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    public function submitter() {
        return $this->belongsTo(User::class, "submitter_id");
    }

    public function developer() {
        return $this->belongsTo(User::class, "developer_id");
    }

    public function project() {
        return $this->belongsTo(Project::class, "project_id");
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function priorities() {
        return $this->belongsToMany(TicketPriority::class);
    }
}
