<template>
  <form @submit.prevent="handleLogin" class="login-form" :class="{ loading: isLoading }">
    <div>
      <label for="email">Email :</label>
      <input id="email" v-model="email" type="email" required :disabled="isLoading" />
    </div>
    <div>
      <label for="password">Mot de passe :</label>
      <input id="password" v-model="password" type="password" required :disabled="isLoading" />
    </div>
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Connexion...' : 'Se connecter' }}
    </button>

    <div v-if="isLoading" class="spinner"></div>
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
const isLoading = ref(false);
const router = useRouter();
const toast = useToast();
const userStore = useUserStore();

const handleLogin = async () => {
  error.value = '';
  isLoading.value = true;

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
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: opacity 0.3s ease;
}
.login-form.loading {
  opacity: 0.6;
  pointer-events: none;
}

button[disabled] {
  background-color: #ccc;
  cursor: wait;
  width: 30%;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-left-color: #284c3d;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  align-self: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
