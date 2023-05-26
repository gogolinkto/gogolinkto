import {usePage} from "@inertiajs/vue3";
import {computed} from "vue";

export function useRoute() {
    const page = usePage();

    const currentRouteName = computed<string>((): string => {
        return page.props.routeName;
    });

    function isCurrent(...routeNames: string[]) {
        return routeNames.includes(currentRouteName.value);
    }

    return {
        currentRouteName,
        isCurrent,
    }
}
