<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory()->count(6)->create();
        $roles = Role::all();
        $users->each(function($user) use ($roles) {
            $user->roles()->attach($roles->random()->id);
        });
    }
}
