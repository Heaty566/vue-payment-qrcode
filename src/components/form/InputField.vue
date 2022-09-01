<script setup lang="ts">
import { useApiStore } from '@/stores/apiStore';
import { storeToRefs } from 'pinia';
import type { InputHTMLAttributes } from 'vue';
import type { IUseFormRegister } from './formHelper';

export interface Props extends InputHTMLAttributes {
    label?: string;
    name: string;
    value: any;
}

const { name, label } = defineProps<Props>();
const emit = defineEmits<{ (event: 'register', _: IUseFormRegister): void }>();
const { errors, getMessage } = useApiStore();
</script>

<template>
    <div className="space-y-1">
        <label :htmlFor="name" className="block text-sm font-medium text-gray-700 " v-if="label"> {{ label }} </label>
        <input
            :id="name"
            :value="value"
            v-bind="$attrs"
            @change="emit('register', { key: name, value: ($event.currentTarget as HTMLInputElement).value })"
            className="block
        w-full duration-200 border border-gray-300 rounded-sm shadow-sm p-1 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />

        <div v-if="getMessage(name)" class="text-sm text-red-500">{{ `${label} ${getMessage(name)}` }}</div>
    </div>
</template>
