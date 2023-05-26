<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AppButton from "@/Components/Generic/AppButton.vue";
import FormGroup from "@/Components/Form/FormGroup.vue";
import FormLabel from "@/Components/Form/FormLabel.vue";
import FormInput from "@/Components/Form/FormInput.vue";

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('user-password.update'), {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }

            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <FormSection @submitted="updatePassword">
        <template #title>
            Update Password
        </template>

        <template #description>
            Ensure your account is using a long, random password to stay secure.
        </template>

        <template #form>
            <FormGroup class="col-span-6 sm:col-span-4" :error="form.errors.current_password">
                <FormLabel>Current Password</FormLabel>
                <FormInput
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    autocomplete="current-password"
                />
            </FormGroup>

            <FormGroup class="col-span-6 sm:col-span-4" :error="form.errors.password">
                <FormLabel>Password</FormLabel>
                <FormInput
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    autocomplete="new-password"
                />
            </FormGroup>

            <FormGroup class="col-span-6 sm:col-span-4" :error="form.errors.password_confirmation">
                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                    v-model="form.password_confirmation"
                    type="password"
                    autocomplete="new-password"
                />
            </FormGroup>
        </template>

        <template #actions>
            <ActionMessage :on="form.recentlySuccessful" class="mr-3">
                Saved.
            </ActionMessage>

            <AppButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save
            </AppButton>
        </template>
    </FormSection>
</template>
