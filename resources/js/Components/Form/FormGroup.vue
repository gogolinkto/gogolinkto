<template>
    <div>
        <div class="space-y-2">
            <slot />
        </div>
        <span v-if="formData.error" class="text-red-600 text-sm pt-1.5 block">{{ formData.error }}</span>
    </div>
</template>
<script lang="ts" setup>
import {provideFormData} from "@/Components/Form/form-provider";
import {reactive, watch} from "vue";

const props = defineProps({
    error: {
        type: String,
        default: null,
    },
})

const uuid = Math.random().toString(36).substring(2, 9);
const formData = reactive({
    uuid,
    error: props.error ?? null,
});

watch(() => props.error, (error) => {
    formData.error = error ?? null;
});

provideFormData(formData);
</script>
