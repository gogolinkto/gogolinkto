<template>
    <li>
        <div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
        <ul role="list" class="-mx-2 mt-2 space-y-1">
            <li v-for="team in teams" :key="team.id">
                <Link :href="route('current-team.update', { team_id: team.id })" as="button" method="put" :class="{
                    'bg-gray-50 text-indigo-600': team.current,
                    'text-gray-700 hover:text-indigo-600 hover:bg-gray-50': !team.current,
                }" class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full">
                    <span :class="[team.current ? 'text-indigo-600 border-indigo-600' : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600', 'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white']">{{ team.initial }}</span>
                    <span class="truncate">{{ team.name }}</span>
                </Link>
            </li>
        </ul>
    </li>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import {router, Link} from "@inertiajs/vue3";
import {useTeams} from "@/Composables/teams";

const { allTeams, isCurrentTeam } = useTeams();

type TeamSwitcherTeam = {
    id: number;
    name: string;
    initial: string;
    current: boolean;
};

const teams = computed<TeamSwitcherTeam[]>(() => {
    return allTeams.value.map((team) => ({
        id: team.id,
        name: team.name,
        initial: team.name.charAt(0).toUpperCase(),
        current: isCurrentTeam(team.id),
    }));
});
</script>
