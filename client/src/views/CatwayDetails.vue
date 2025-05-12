<template>
  <div class="catway-details" v-if="catway && catway._id">

    <h1>Détails du catway</h1>

    <p v-if="loading">Chargement...</p>
    <p v-if="error" class="error">❌ {{ error }}</p>

    <div v-if="catway">
      <p><strong>ID :</strong> {{ catway._id }}</p>
      <p><strong>Numéro :</strong> {{ catway.catwayNumber }}</p>
      <p><strong>Type :</strong> {{ catway.type }}</p>
      <p><strong>État :</strong> {{ catway.catwayState }}</p>
    </div>
  </div>
  <p v-else>Le catway est introuvable ou en cours de chargement.</p>

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
  console.log("🧭 Chargement détails catway ID :", route.params.id);
  try {
    const res = await api.get(`/catways/${route.params.id}`, { headers });
    console.log("✅ Réponse reçue :", res.data);
    catway.value = res.data;
  } catch (err) {
    console.error("❌ Erreur API :", err);
    error.value = err.response?.data?.error || 'Erreur serveur';
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
}
</style>
