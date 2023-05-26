<template>
    <form class="flex justify-end">
        <Listbox as="div" v-model="selected" @update:modelValue="selectRange" class="flex items-center space-x-2">
            <ListboxLabel class="block text-sm font-medium text-gray-900">Showing results for</ListboxLabel>
            <div class="relative">
                <ListboxButton class="relative w-48 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
                    <span class="block truncate">{{ selected.name }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption as="template" v-for="range in ranges" :key="range.id" :value="range" v-slot="{ active, selected }">
                            <li :class="[active ? 'bg-primary-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ range.name }}</span>

                                <span v-if="selected" :class="[active ? 'text-white' : 'text-primary-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </form>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {router, usePage} from "@inertiajs/vue3";

const ranges = [
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'Last Week' },
    { id: 'month', name: 'Last Month' },
]

const page = usePage();

// TODO: Change this to a prop
const selectedRangeFromUrl = computed(() => {
    const query = page.url.split('?')[1];
    return new URLSearchParams(query).get('range')
});

watch(selectedRangeFromUrl, () => {
    selected.value = ranges.find(range => range.id === selectedRangeFromUrl.value) ?? ranges[0];
});

const selected = ref(ranges.find(range => range.id === selectedRangeFromUrl.value) ?? ranges[0]);

function selectRange() {
    router.get('/dashboard', { range: selected.value.id }, { preserveState: true });
}
</script>
