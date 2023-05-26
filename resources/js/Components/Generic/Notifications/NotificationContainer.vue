<template>
    <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-40">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <transition v-for="notification in store.notifications" :key="notification.uuid" :appear="true" enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <component :is="componentMap[notification.component]" v-bind="notification.props" @close="store.closeNotification(notification.uuid)" />
            </transition>
        </div>
    </div>
    <slot />
</template>

<script setup>
import SimpleNotification from "@/Components/Generic/Notifications/SimpleNotification.vue";
import {useNotificationStore} from "@/Stores/notification";

const store = useNotificationStore();
const componentMap = {
    'simple-notification': SimpleNotification,
}

</script>
