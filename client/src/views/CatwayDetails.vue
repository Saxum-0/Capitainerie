<template>
  <div class="catway-details" v-if="catway && catway._id">
    <h1>Détails du catway</h1>
    <p><strong>ID :</strong> {{ catway._id }}</p>
    <p><strong>Numéro :</strong> {{ catway.catwayNumber }}</p>
    <p><strong>Type :</strong> {{ catway.type }}</p>
    <p><strong>État :</strong> {{ catway.catwayState }}</p>
    <p><strong>Créé le :</strong> {{ formatDate(catway.createdAt) }}</p>
  </div>
  <p v-else>Chargement du catway ou introuvable...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import api from '@/config/api';

const route = useRoute();
const catway = ref(null);
const userStore = useUserStore();
const headers = { Authorization: `Bearer ${userStore.token}` };

const formatDate = (dateStr) => new Date(dateStr).toLocaleString('fr-FR');

onMounted(async () => {
  try {
    const res = await api.get(`/catways/${route.params.id}`, { headers });
    catway.value = res.data;
  } catch (err) {
    console.error('❌ Erreur chargement catway :', err);
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
</style>
