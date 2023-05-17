import React, {Fragment, useEffect, useState} from "react";
import {NotificationContext, Notification, NotificationContextType} from "@/Contexts/notification";
import {Transition} from "@headlessui/react";
import useTypedPage from "@/Hooks/useTypedPage";

type NotificationWrapperProps = {
    children: React.ReactNode,
}

export default function NotificationWrapper({ children }: NotificationWrapperProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    function addNotification(notification: Notification) {
        if (notification.uuid === undefined) {
            notification.uuid = crypto.randomUUID();
        }

        setNotifications((notifications) => {
            const notificationsWithoutSameUuid = notifications.filter((n) => n.uuid !== notification.uuid);
            const notificationsDistinctGroups = notificationsWithoutSameUuid.filter((n) => n.group !== notification.group);

            return [...notificationsDistinctGroups, notification];
        });
    }

    useEffect(() => {
        if (notifications.length === 0) {
            return () => {};
        }

        const intervalId = setInterval(() => {
            const n = notifications.filter((notification) => notification.disappearAt === undefined || notification.disappearAt > Date.now());
            setNotifications(() => n);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    },[notifications]);

    const value: NotificationContextType = {
        notifications,
        addNotification,
    }

    return (
        <NotificationContext.Provider value={value}>
            <div
                aria-live="assertive"
                className="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 mt-16"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    { notifications.map((notification) => (
                        <Transition
                            show={true}
                            appear={true}
                            as={Fragment}
                            enter="transform ease-out duration-300 transition"
                            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            key={notification.uuid}
                        >
                            {notification.component({
                                dismiss() {
                                    setNotifications((notifications) => notifications.filter((n) => n.uuid !== notification.uuid));
                                }
                            })}
                        </Transition>
                    )) }
                </div>
            </div>
            { children }
        </NotificationContext.Provider>
    )
}
