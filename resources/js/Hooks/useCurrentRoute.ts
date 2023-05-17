import useTypedPage from "@/Hooks/useTypedPage";

export function useCurrentRoute() {
    const page = useTypedPage();
    const currentRoute = page.props.currentRoute;

    function isCurrentRoute(...routes: string[]) {
        return routes.includes(currentRoute);
    }

    return {
        isCurrentRoute,
        currentRoute,
    }
}
