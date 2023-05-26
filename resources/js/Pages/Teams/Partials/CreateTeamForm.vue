<script setup>
import { useForm } from '@inertiajs/vue3';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import FormGroup from "@/Components/Form/FormGroup.vue";
import FormLabel from "@/Components/Form/FormLabel.vue";
import FormInput from "@/Components/Form/FormInput.vue";
import AppButton from "@/Components/Generic/AppButton.vue";

const form = useForm({
    name: '',
});

const createTeam = () => {
    form.post(route('teams.store'), {
        errorBag: 'createTeam',
        preserveScroll: true,
    });
};
</script>

<template>
    <FormSection @submitted="createTeam">
        <template #title>
            Team Details
        </template>

        <template #description>
            Create a new team to collaborate with others on projects.
        </template>

        <template #form>
            <div class="col-span-6">
                <InputLabel value="Team Owner" />

                <div class="flex items-center mt-2">
                    <img class="object-cover w-12 h-12 rounded-full" :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.auth.user.name">

                    <div class="ml-4 leading-tight">
                        <div class="text-gray-900">{{ $page.props.auth.user.name }}</div>
                        <div class="text-sm text-gray-700">
                            {{ $page.props.auth.user.email }}
                        </div>
                    </div>
                </div>
            </div>

            <FormGroup class="col-span-6 sm:col-span-4" :error="form.errors.name">
                <FormLabel>Team name</FormLabel>
                <FormInput
                    v-model="form.name"
                    type="text"
                    autofocus
                />
            </FormGroup>
        </template>

        <template #actions>
            <AppButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Create
            </AppButton>
        </template>
    </FormSection>
</template>
