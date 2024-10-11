import { createRouter, createWebHistory } from 'vue-router';
import { getRoutes } from './routes';

const routes = getRoutes();

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
