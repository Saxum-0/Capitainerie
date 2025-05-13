<template>
  <div class="catway-details" v-if="catway && catway._id">
    <h1>Détails du catway</h1>
    <p><strong>ID :</strong> {{ catway._id }}</p>
    <p><strong>Numéro :</strong> {{ catway.catwayNumber }}</p>
    <p><strong>Type :</strong> {{ catway.type }}</p>
    <p><strong>État :</strong> {{ catway.catwayState }}</p>
    <p><strong>Créé le :</strong> {{ formatDate(catway.createdAt) }}</p>
    <button @click="goBack">← Retour</button>
  </div>

  <p v-else-if="catway === false">Catway introuvable.</p>
  <p v-else>Chargement du catway...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import api from '@/config/api';

const route = useRoute();
const router = useRouter();
const catway = ref(null);
const userStore = useUserStore();
const headers = { Authorization: `Bearer ${userStore.token}` };

const formatDate = (dateStr) => new Date(dateStr).toLocaleString('fr-FR');

const goBack = () => {
  router.push('/dashboard');
};

onMounted(async () => {
  try {
    const res = await api.get(`/catways/${route.params.id}`, { headers });
    catway.value = res.data;
    console.log("✅ Catway chargé :", catway.value);
  } catch (err) {
    console.error('❌ Erreur chargement catway :', err);
    catway.value = false;
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
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #284c3d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #3a6a54;
}
</style>
