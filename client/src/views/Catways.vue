<template>
  <div class="catways">
    <h1>Liste des catways</h1>

    <div v-if="loading">Chargement des catways...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="catways.length === 0">Aucun catway disponible.</div>

    <ul v-else>
      <li v-for="catway in catways" :key="catway._id">
        <strong>ID :</strong> {{ catway._id }}<br />
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
import { useUserStore } from '@/stores/user';
import api from '@/config/api';

const catways = ref([]);
const loading = ref(true);
const error = ref('');

const userStore = useUserStore();
const headers = { Authorization: `Bearer ${userStore.token}` };

onMounted(async () => {
  try {
    const res = await api.get('/catways', { headers });
    catways.value = res.data;
  } catch (err) {
    console.error('❌ Erreur chargement catways :', err);
    error.value = 'Erreur lors du chargement des catways.';
  } finally {
    loading.value = false;
  }
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
.error {
  color: red;
  font-weight: bold;
  margin: 1rem 0;
}
</style>
