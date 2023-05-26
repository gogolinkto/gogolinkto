<template>
    <div class="relative mt-2 rounded-md shadow-sm">
        <input
            v-bind="inputBindings"
            @input="emit('update:modelValue', $event.target.value)"
            :value="modelValue"
            :class="[
                'block w-full rounded-md border-0 py-2.5 pr-10  ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                {
                    'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500': !!data.error,
                    'ring-gray-300 placeholder:text-gray-400 focus:ring-primary-600 ': !data.error
                }
            ]"
            class=""
            aria-invalid="true"
            aria-describedby="email-error"
        />
        <div v-if="data.error" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import {injectFormData} from "@/Components/Form/form-provider";
import {computed, useAttrs} from "vue";
import { ExclamationCircleIcon} from "@heroicons/vue/24/outline";

defineProps({
    modelValue: String,
});

defineOptions({
    inheritAttrs: false,
})

const attrs = useAttrs();

const emit = defineEmits({
    'update:modelValue': (value?: string) => true,
});


const data = injectFormData();
const inputBindings = computed(() => {
    return {
        id: data.uuid,
        ...attrs,
    }
});
</script>
