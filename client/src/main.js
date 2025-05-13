// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App); // 👈 d’abord on crée l’app

app.use(createPinia());
app.use(router);
app.use(Toast, { // 👈 ensuite on enregistre le toast
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

app.mount('#app');
