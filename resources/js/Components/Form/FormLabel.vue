<template>
    <label v-bind="labelBindings" :class="[
        'block text-sm font-medium leading-6 text-gray-900',
        { 'text-red-600': data.error }
    ]">
        <slot />
    </label>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import {injectFormData} from "@/Components/Form/form-provider";

const data = injectFormData();
const labelBindings = computed(() => {
    return {
        for: data.uuid,
    }
});
</script>
