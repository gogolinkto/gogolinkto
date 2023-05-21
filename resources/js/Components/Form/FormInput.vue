<template>
    <input
        @input="emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        :class="[
            'block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6',
            { 'ring-red-600 focus:ring-red-600': data.error, 'ring-gray-300 focus:ring-primary-600': !data.error },
        ]"
        v-bind="inputBindings"
    />
</template>
<script lang="ts" setup>
import {injectFormData} from "@/Components/Form/form-provider";
import {computed} from "vue";

defineProps({
    modelValue: String,
});

const emit = defineEmits({
    'update:modelValue': (value?: string) => true,
});


const data = injectFormData();
const inputBindings = computed(() => {
    return {
        id: data.uuid,
    }
});
</script>
