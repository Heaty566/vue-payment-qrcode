<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Headers from './components/Header.vue';
</script>

<template>
    <div class="min-h-screen">
        <Headers />
        <RouterView />
    </div>
</template>
