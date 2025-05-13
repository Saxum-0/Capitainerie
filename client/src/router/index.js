import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import Catways from '@/views/Catways.vue';
import CatwayDetails from '@/views/CatwayDetails.vue';
import Reservations from '@/views/Reservations.vue';
import ReservationDetails from '@/views/ReservationDetails.vue';
import Documentation from '@/views/Documentation.vue';

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/catways', name: 'Catways', component: Catways, meta: { requiresAuth: true } },
  { path: '/catway/:id', name: 'CatwayDetails', component: CatwayDetails, meta: { requiresAuth: true } },
  { path: '/reservations', name: 'Reservations', component: Reservations, meta: { requiresAuth: true } },
  { path: '/reservation/:id', name: 'ReservationDetails', component: ReservationDetails, meta: { requiresAuth: true } },
  { path: '/documentation', name: 'Documentation', component: Documentation },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard global
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const { token } = storeToRefs(userStore);

  if (to.meta.requiresAuth && !token.value) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;

