<script setup>
import {Head, Link, useForm} from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import AuthPageTitle from "@/Components/Auth/AuthPageTitle.vue";
import FormGroup from "@/Components/Form/FormGroup.vue";
import FormLabel from "@/Components/Form/FormLabel.vue";
import FormInput from "@/Components/Form/FormInput.vue";
import AppButton from "@/Components/Generic/AppButton.vue";

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <Head title="Forgot Password" />

    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthPageTitle>Recover your password</AuthPageTitle>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form class="space-y-6" :action="route('password.email')" method="POST" @submit.prevent="submit">
                    <FormGroup :error="form.errors.email">
                        <FormLabel>Email address</FormLabel>
                        <FormInput v-model="form.email" @input="form.clearErrors('email')" name="email" type="email" autocomplete="email" required="" :disabled="form.processing" />
                    </FormGroup>

                    <div>
                        <AppButton class="w-full" type="submit" :disabled="form.processing">Send Password Recover Email</AppButton>
                    </div>
                </form>
            </div>
        </div>
        <p class="mt-10 text-center text-sm text-gray-500">
            Did you remember your password?
            {{ ' ' }}
            <Link :href="route('login')" class="font-semibold leading-6 text-primary-600 hover:text-primary-500">Try to login here</Link>
        </p>
    </div>
</template>
