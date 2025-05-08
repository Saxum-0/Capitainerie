<template>
    <div class="reservation-details" v-if="reservation">
      <h1>Détails de la réservation</h1>
      <p><strong>Client :</strong> {{ reservation.clientName }}</p>
      <p><strong>Bateau :</strong> {{ reservation.boatName }}</p>
      <p><strong>Catway :</strong> {{ reservation.catwayNumber }}</p>
      <p><strong>Check-in :</strong> {{ reservation.checkIn }}</p>
      <p><strong>Check-out :</strong> {{ reservation.checkOut }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';
  
  const route = useRoute();
  const reservation = ref(null);
  const userStore = useUserStore();
  const headers = { Authorization: `Bearer ${userStore.token}` };
  
  onMounted(async () => {
    const res = await axios.get(`http://localhost:3001/reservations/${route.params.id}`, { headers });
    reservation.value = res.data;
  });
  </script>
  
  <style scoped>
  .reservation-details {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  