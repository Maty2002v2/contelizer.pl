const routes = [
    {
      path: '/task1',
      component: () => import('../pages/Task1.vue')
    },
    {
      path: '/task2',
      component: () => import('../pages/Task2.vue')
    },
    {
      path: '/task3',
      component: () => import('../pages/Task3.vue')
    },
];

export function getRoutes() {
    return routes;
}
