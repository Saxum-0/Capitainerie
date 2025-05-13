<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div>
      <label for="email">Email :</label>
      <input id="email" v-model="email" type="email" required />
    </div>
    <div>
      <label for="password">Mot de passe :</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <button type="submit">Se connecter</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/stores/user';
import api from '@/config/api';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const toast = useToast();
const userStore = useUserStore();

const handleLogin = async () => {
  error.value = '';

  try {
    const { data } = await api.post('/login', {
      email: email.value,
      password: password.value,
    });

    userStore.setUser(data);
    toast.success('✅ Connexion réussie !');
    router.push('/dashboard');
  } catch (err) {
    const msg = err.response?.data?.error || 'Erreur lors de la connexion';
    error.value = msg;
    toast.error(`❌ ${msg}`);
  }
};
</script>

<style scoped>
.login-form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>

