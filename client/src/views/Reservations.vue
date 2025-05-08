 <template>
    <div class="reservations">
      <h1>Liste des réservations</h1>
      <ul>
        <li v-for="res in reservations" :key="res._id">
          <strong>Client :</strong> {{ res.clientName }} -
          <strong>Bateau :</strong> {{ res.boatName }} -
          <strong>Catway :</strong> {{ res.catwayNumber }} -
          <strong>Du :</strong> {{ res.checkIn }} <strong>au</strong> {{ res.checkOut }}
          <router-link :to="`/reservation/${res._id}`">Détails</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';
  
  defineOptions({
    name: 'DashboardPage'
  });

  const reservations = ref([]);
  const userStore = useUserStore();
  const headers = { Authorization: `Bearer ${userStore.token}` };
  
  onMounted(async () => {
    const res = await axios.get('http://localhost:3001/reservations', { headers });
    reservations.value = res.data;
  });
  </script>
  
  <style scoped>
  .reservations {
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
  