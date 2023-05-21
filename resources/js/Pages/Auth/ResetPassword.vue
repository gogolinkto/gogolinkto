<script setup>
import {Head, Link, useForm} from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import FormLabel from "@/Components/Form/FormLabel.vue";
import FormGroup from "@/Components/Form/FormGroup.vue";
import LoginWithSocial from "@/Components/Auth/LoginWithSocial.vue";
import FormInput from "@/Components/Form/FormInput.vue";
import AuthPageTitle from "@/Components/Auth/AuthPageTitle.vue";
import AppButton from "@/Components/Generic/AppButton.vue";

const props = defineProps({
    email: String,
    token: String,
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Reset Password" />

    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthPageTitle>Reset account password</AuthPageTitle>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form class="space-y-6" :action="route('password.update')" method="POST" @submit.prevent="submit">
                    <input hidden="" type="hidden" name="token" :value="form.token" />
                    <input hidden="" type="hidden" name="email" :value="form.email" />
                    <FormGroup :error="form.errors.email">
                        <FormLabel>Email address</FormLabel>
                        <FormInput v-model="form.email" @input="form.clearErrors('email')" name="email" type="email" autocomplete="email" required="" :disabled="form.processing" />
                    </FormGroup>

                    <FormGroup :error="form.errors.password">
                        <FormLabel>Password</FormLabel>
                        <FormInput v-model="form.password" @input="form.clearErrors('password')" name="password" type="password" autocomplete="current-password" required="" :disabled="form.processing" />
                    </FormGroup>

                    <FormGroup :error="form.errors.password_confirmation">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormInput v-model="form.password_confirmation" @input="form.clearErrors('password_confirmation')" name="password_confirmation" type="password" autocomplete="current-password" required="" :disabled="form.processing" />
                    </FormGroup>

                    <div>
                        <AppButton class="w-full" type="submit" :disabled="form.processing">Change password</AppButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
