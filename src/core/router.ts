import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

type routeKey = 'home';

export const routers: Record<routeKey, RouteRecordRaw> = {
    home: {
        path: '/',
        name: 'Home',
        component: Home,
    },
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: Object.keys(routers).map((key) => routers[key as keyof typeof routers]),
});

export default router;
