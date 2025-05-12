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
import { useUserStore } from '@/stores/user';
import api from '@/config/api';

const route = useRoute();
const catway = ref(null);
const userStore = useUserStore();
const headers = { Authorization: `Bearer ${userStore.token}` };
const id = route.params.id;

onMounted(async () => {
  const res = await api.get(`/catways/${id}`, { headers });

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
