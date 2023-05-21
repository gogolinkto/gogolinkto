<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import LoginWithSocial from "@/Components/Auth/LoginWithSocial.vue";
import FormLabel from "@/Components/Form/FormLabel.vue";
import FormGroup from "@/Components/Form/FormGroup.vue";
import FormInput from "@/Components/Form/FormInput.vue";
import AuthPageTitle from "@/Components/Auth/AuthPageTitle.vue";
import AppButton from "@/Components/Generic/AppButton.vue";

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register" />

    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthPageTitle>Create your free account</AuthPageTitle>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form class="space-y-6" :action="route('login')" method="POST" @submit.prevent="submit">
                    <FormGroup :error="form.errors.email">
                        <FormLabel>Name</FormLabel>
                        <FormInput v-model="form.name" @input="form.clearErrors('name')" name="name" type="text" autocomplete="name" required="" :disabled="form.processing" />
                    </FormGroup>
                    <FormGroup :error="form.errors.email">
                        <FormLabel>Email address</FormLabel>
                        <FormInput v-model="form.email" @input="form.clearErrors('email')" name="email" type="email" autocomplete="email" required="" :disabled="form.processing" />
                    </FormGroup>

                    <FormGroup :error="form.errors.password">
                        <FormLabel>Password</FormLabel>
                        <FormInput v-model="form.password" @input="form.clearErrors('email', 'password')" name="password" type="password" autocomplete="current-password" required="" :disabled="form.processing" />
                    </FormGroup>

                    <div>
                        <AppButton class="w-full" type="submit" :disabled="form.processing">{{ form.processing ? 'Trying to Sign you In' : 'Register'}}</AppButton>
                    </div>
                </form>

                <LoginWithSocial />
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
                Already a member?
                {{ ' ' }}
                <Link :href="route('login')" class="font-semibold leading-6 text-primary-600 hover:text-primary-500">Sign in with your account</Link>
            </p>
        </div>
    </div>
</template>
