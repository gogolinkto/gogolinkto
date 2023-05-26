<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';
import SummaryStats from "@/Components/Dashboard/SummaryStats.vue";
import DashboardHeader from "@/Components/Dashboard/DashboardHeader.vue";
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="grid grid-cols-1 gap-8">
            <DashboardHeader />
            <SummaryStats />
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="px-4 py-5 sm:p-6 bg-white rounded-xl shadow col-span-2">Some graph with visits</div>
                <div class="px-4 py-5 sm:p-6 bg-white rounded-xl shadow">
                    Most visited links
                </div>
            </div>
        </div>

    </AppLayout>
</template>
