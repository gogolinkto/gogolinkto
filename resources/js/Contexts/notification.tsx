import React, {createContext} from "react";

export type NotificationCallbacks = {
    dismiss(): void,
}

export type Notification = {
    uuid?: string,
    component: (callbacks: NotificationCallbacks) => React.ReactNode,
    disappearAt?: number,
    group?: string,
}

export type NotificationContextType = {
    notifications: Notification[],
    addNotification(notification: Notification): void,
}

export const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    addNotification() {}
})
