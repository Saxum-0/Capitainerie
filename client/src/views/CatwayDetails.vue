<template>
    <div class="catway-details" v-if="catway">
      <h1>Détails du catway</h1>
      <p><strong>Numéro :</strong> {{ catway.catwayNumber }}</p>
      <p><strong>Type :</strong> {{ catway.type }}</p>
      <p><strong>État :</strong> {{ catway.catwayState }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';
  
  const route = useRoute();
  const catway = ref(null);
  const userStore = useUserStore();
  const headers = { Authorization: `Bearer ${userStore.token}` };
  
  onMounted(async () => {
    const res = await axios.get(`http://localhost:3001/catways/${route.params.id}`, { headers });
    catway.value = res.data;
  });
  </script>
  
  <style scoped>
  .catway-details {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  