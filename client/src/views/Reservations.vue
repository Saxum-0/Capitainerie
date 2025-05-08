<template>
  <div class="reservations">
    <h1>Réservations par Catway</h1>

    <!-- Champ pour saisir l'ID du catway -->
    <input v-model="catwayId" placeholder="ID du catway" />
    <button @click="fetchReservations">Charger les réservations</button>

    <ul v-if="reservations.length">
      <li v-for="res in reservations" :key="res._id">
        <strong>Client :</strong> {{ res.clientName }} -
        <strong>Bateau :</strong> {{ res.boatName }} -
        <strong>Catway :</strong> {{ res.catwayNumber }} -
        <strong>Du :</strong> {{ res.checkIn }} <strong>au</strong> {{ res.checkOut }}
        <router-link :to="`/reservation/${res._id}`">Détails</router-link>
      </li>
    </ul>

    <p v-else>Aucune réservation trouvée.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import api from '@/config/api';

const catwayId = ref('');
const reservations = ref([]);
const userStore = useUserStore();
const headers = { Authorization: `Bearer ${userStore.token}` };

const fetchReservations = async () => {
  if (!catwayId.value) return;

  try {
    const res = await api.get(`/catways/${catwayId.value}/reservations`, { headers });
    reservations.value = res.data;
  } catch (err) {
    console.error('❌ Erreur chargement réservations :', err);
    reservations.value = [];
  }
};
</script>

<style scoped>
.reservations {
  max-width: 700px;
  margin: 0 auto;
}
input {
  margin-right: 10px;
  padding: 0.5rem;
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
