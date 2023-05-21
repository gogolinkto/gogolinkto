<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppButton from "@/Components/Generic/AppButton.vue";
import FormInput from "@/Components/Form/FormInput.vue";
import FormGroup from "@/Components/Form/FormGroup.vue";
import FormLabel from "@/Components/Form/FormLabel.vue";
import LoginWithSocial from "@/Components/Auth/LoginWithSocial.vue";
import AuthPageTitle from "@/Components/Auth/AuthPageTitle.vue";

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in" />

    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthPageTitle>Log in to your account</AuthPageTitle>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form class="space-y-6" :action="route('login')" method="POST" @submit.prevent="submit">
                    <FormGroup :error="form.errors.email">
                        <FormLabel>Email address</FormLabel>
                        <FormInput v-model="form.email" @input="form.clearErrors('email')" name="email" type="email" autocomplete="email" required="" :disabled="form.processing" />
                    </FormGroup>

                    <FormGroup :error="form.errors.password">
                        <FormLabel>Password</FormLabel>
                        <FormInput v-model="form.password" @input="form.clearErrors('email', 'password')" name="password" type="password" autocomplete="current-password" required="" :disabled="form.processing" />
                    </FormGroup>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input v-model="form.remember" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600" :disabled="form.processing" />
                            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
                        </div>

                        <div v-if="canResetPassword" class="text-sm leading-6">
                            <Link :href="route('password.request')" class="font-semibold text-primary-600 hover:text-primary-500">Forgot password?</Link>
                        </div>
                    </div>

                    <div>
                        <AppButton class="w-full" type="submit" :disabled="form.processing">{{ form.processing ? 'Trying to Sign you In' : 'Sign in'}}</AppButton>
                    </div>
                </form>

                <LoginWithSocial />
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ ' ' }}
                <Link :href="route('register')" class="font-semibold leading-6 text-primary-600 hover:text-primary-500">Create your own free account</Link>
            </p>
        </div>
    </div>
</template>
