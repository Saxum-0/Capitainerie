<template>
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/dashboard" v-if="user">Tableau de bord</router-link>
      <router-link to="/catways" v-if="user">Catways</router-link>
      <router-link to="/reservations" v-if="user">Réservations</router-link>
      <router-link to="/documentation">Documentation</router-link>
  
      <button v-if="user" @click="logout">Déconnexion</button>
    </nav>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  
  const userStore = useUserStore();
  const router = useRouter();
  
  const user = computed(() => userStore.user);
  
  defineOptions({
  name: 'DashboardPage'
    });


  const logout = () => {
    userStore.logout();
    router.push('/');
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #42b983;
    color: white;
  }
  
  .navbar a {
    color: white;
    font-weight: bold;
  }
  
  button {
    background: none;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  </style>
  