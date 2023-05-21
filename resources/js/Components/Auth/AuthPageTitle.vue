<template>
    <div class="flex items-center justify-center">
        <div class="flex items-center space-x-4">
            <Link href="/">
                <Logo :size="110" />
            </Link>
            <div class="border-l h-12 border-gray-200"></div>
            <h2 class="text-xl font-bold leading-9 tracking-tight text-gray-900">
                <slot />
            </h2>
        </div>
    </div>
</template>
<script setup>
import { Link } from '@inertiajs/vue3';
import Logo from "@/Components/Generic/Logo.vue";
</script>
