<?php

namespace App\Actions\Jetstream;

use App\Http\Inertia\Notification;
use App\Models\Team;
use Laravel\Jetstream\Contracts\DeletesTeams;

class DeleteTeam implements DeletesTeams
{
    /**
     * Delete the given team.
     */
    public function delete(Team $team): void
    {
        $team->purge();

        Notification::success('Team Deleted', "Team {$team->name} has been deleted.");
    }
}
