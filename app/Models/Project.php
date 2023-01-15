<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function projectManager() {
        return $this->belongsTo(User::class);
    }

    public function tickets() {
        return $this->hasMany(Ticket::class);
    }
}
