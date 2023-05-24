import {usePage} from "@inertiajs/vue3";
import {computed} from "vue";

type Team = {
    id: number;
    name: string;
}

export function useTeams() {
    const page = usePage();

    const user = computed(() => page.props.auth.user);

    const allTeams = computed<Team[]>(() => {
        const user = page.props.auth.user;

        return user.all_teams.map((team: any) => {
            return {
                id: team.id,
                name: team.name,
            };
        });
    });

    function isCurrentTeam(teamId: number) {
        const localUser = user.value;
        return localUser.current_team_id === teamId;
    }

    return {
        allTeams,
        isCurrentTeam,
    }
}
