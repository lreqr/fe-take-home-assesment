import { createRouter, createWebHistory } from 'vue-router';

import { env } from '@/config/env';
const router = createRouter({
  history: createWebHistory(env.APP_BASE_PATH),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    }
  ]
});

export default router;
