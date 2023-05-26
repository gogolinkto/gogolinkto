import {defineStore} from "pinia";
import {usePage} from "@inertiajs/vue3";
import {computed, ref, watch} from "vue";
import d from 'debug';

const debug = d('notification');

export const useNotificationStore = defineStore('notification', () => {
    const page = usePage();
    const notifications = ref<any[]>([]);
    const notificationTimeouts = new Map<string, NodeJS.Timeout>();
    const computedNotifications = computed<any>(() => page.props.notifications);

    watch(computedNotifications, () => {
        pushNotification(...computedNotifications.value)
    })

    function pushNotification(...n: any) {
        notifications.value = [...notifications.value, ...n];
        n.forEach((notification: any) => {
            if (notification.ttl) {
                const timeout = setTimeout(() => {
                    debug('closing notification from timeout', notification.uuid);
                    closeNotification(notification.uuid);
                }, notification.ttl * 1000);
                notificationTimeouts.set(notification.uuid, timeout);
            }
        });
    }

    function closeNotification(uuid: string) {
        notifications.value = notifications.value.filter((notification) => notification.uuid !== uuid);
        if (notificationTimeouts.has(uuid)) {
            clearTimeout(notificationTimeouts.get(uuid) as NodeJS.Timeout);
            notificationTimeouts.delete(uuid);
        }

        debug('closed notification', uuid);
    }

    return {
        notifications: computed(() => notifications.value),
        pushNotification,
        closeNotification,
    }
});
