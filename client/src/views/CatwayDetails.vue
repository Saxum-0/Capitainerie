<template>
  <div class="catway-details">
    <h1>Détails du catway</h1>

    <p v-if="loading">Chargement...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <div v-else-if="catway">
      <p><strong>Numéro :</strong> {{ catway.catwayNumber }}</p>
      <p><strong>Type :</strong> {{ catway.type }}</p>
      <p><strong>État :</strong> {{ catway.catwayState }}</p>
    </div>
    <p v-else>Aucune donnée trouvée.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import api from '@/config/api';

const route = useRoute();
const catway = ref(null);
const loading = ref(true);
const error = ref('');
const userStore = useUserStore();
const headers = { Authorization: `Bearer ${userStore.token}` };

onMounted(async () => {
  try {
    const { data } = await api.get(`/catways/${route.params.id}`, { headers });
    catway.value = data;
  } catch (err) {
    console.error('❌ Erreur chargement catway :', err);
    error.value = 'Impossible de charger les détails du catway.';
  } finally {
    loading.value = false;
  }
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
.error {
  color: red;
  font-weight: bold;
}
</style>
