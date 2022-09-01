<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';
export interface Props extends ButtonHTMLAttributes {
    label: string;
    name: string;
}

const props = defineProps<Props>();
</script>

<template>
    <button :id="props.name" class="px-8 py-1 font-medium text-white bg-blue-500">{{ props.label }}</button>
</template>
