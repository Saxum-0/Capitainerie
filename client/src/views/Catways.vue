<template>
    <div class="catways">
      <h1>Liste des catways</h1>
      <ul>
        <li v-for="catway in catways" :key="catway._id">
          <strong>Numéro :</strong> {{ catway.catwayNumber }} -
          <strong>Type :</strong> {{ catway.type }} -
          <strong>État :</strong> {{ catway.catwayState }}
          <router-link :to="`/catway/${catway._id}`">Détails</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';
  import api from '@/config/api';

  defineOptions({
  name: 'DashboardPage'
    });

  const catways = ref([]);
  const userStore = useUserStore();
  const headers = { Authorization: `Bearer ${userStore.token}` };
  
  onMounted(async () => {
    const res = await api.get('/catways', { headers });
    catways.value = res.data;
  });
  </script>
  
  <style scoped>
  .catways {
    max-width: 700px;
    margin: 0 auto;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  