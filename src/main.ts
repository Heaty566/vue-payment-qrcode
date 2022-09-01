import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './core/router';

import './assets/main.css';

const app = createApp(App).mixin({ inheritAttrs: false });

app.use(createPinia());
app.use(router);

app.mount('#app');
