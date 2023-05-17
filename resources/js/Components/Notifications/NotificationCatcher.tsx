import React, {useContext, useEffect} from "react";
import useTypedPage from "@/Hooks/useTypedPage";
import {NotificationContext} from "@/Contexts/notification";
import SimpleNotification from "@/Components/Notifications/SimpleNotification";

export default function NotificationCatcher() {
    const page = useTypedPage();
    const notifications = useContext(NotificationContext);

    useEffect(() => {
        if (page.props.notifications.length === 0) {
            return () => {};
        }

        page.props.notifications.forEach((notification) => {
            notifications.addNotification({
                disappearAt: (new Date()).getTime() + notification.disappearAfter,
                group: notification.group,
                component: (events) => <SimpleNotification dismiss={events.dismiss} type={notification.type} title={notification.title} description={notification.message} />,
            })

        });
    }, [page.props.notifications]);

    return <></>;
}
