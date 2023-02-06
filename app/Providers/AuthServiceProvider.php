<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define("access_manage_roles_page", function(User $user) {
            $roles = $user->roles;
            foreach($roles as $role) {
                if($role->title == "Admin") {
                    return true;
                } else {
                    return false;
                }
            }
        });

        Gate::define("manage_project_staff", function(User $user, $project) {
            if($user->hasRole("Admin")) {
                return true;
            } elseif($user->hasRole("Project Manager") && $user->projects->contains($project)) {
                return true;
            }
            return false;
        });

        Gate::define("can_view_all_projects", function(User $user) {
            return $user->hasRole("Admin");
        });
    }
}
