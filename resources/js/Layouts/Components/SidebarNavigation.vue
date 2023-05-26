<template>
    <li>
        <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
                <Link :href="item.href" :class="[item.current ? 'bg-gray-50 text-primary-600' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <component :is="item.icon" :class="[item.current ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                    {{ item.name }}
                </Link>
            </li>
        </ul>
    </li>
</template>
<script lang="ts" setup>
import {
    ChartPieIcon,
    HomeIcon,
    LinkIcon,
    QrCodeIcon,
} from "@heroicons/vue/24/outline";
import { Link } from '@inertiajs/vue3'
import {useRoute} from "@/Composables/route";

const { isCurrent } = useRoute();

const navigation = [
    { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon, current: isCurrent('dashboard') },
    { name: 'Links', href: '#', icon: LinkIcon, current: false },
    { name: 'QR Codes', href: '#', icon: QrCodeIcon, current: false },
    { name: 'Analytics', href: '#', icon: ChartPieIcon, current: false },
]
</script>
