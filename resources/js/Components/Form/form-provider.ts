import {inject, provide} from "vue";

type FormData = {
    uuid: string;
    error: string|null;
}

export function provideFormData(data: FormData): void {
    provide('formData', data);
}

export function injectFormData(): FormData {
    return inject<FormData>('formData', {
        uuid: Math.random().toString(36).substring(2, 9),
        error: null,
    });
}
