<template>
    <form @submit.prevent="handleLogin" class="login-form">
      <div>
        <label>Email :</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  const userStore = useUserStore();
  
  const handleLogin = async () => {
    error.value = '';
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email.value,
        password: password.value,
      });
  
      userStore.setUser(response.data);
      router.push('/dashboard');
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de la connexion';
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
  