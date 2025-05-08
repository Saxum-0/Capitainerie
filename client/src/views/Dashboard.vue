<template>
    <div class="dashboard">
      <h1>Tableau de bord</h1>
  
      <!-- LIENS NAVIGATION -->
      <nav>
        <router-link to="/catways">Liste des catways</router-link> |
        <router-link to="/reservations">Liste des réservations</router-link> |
        <router-link to="/documentation">Documentation</router-link>
      </nav>
  
      <!-- FORMULAIRES UTILISATEUR -->
      <section>
        <h2>Utilisateurs</h2>
        <form @submit.prevent="createUser">
          <h3>Créer un utilisateur</h3>
          <input v-model="userForm.name" placeholder="Nom" required />
          <input v-model="userForm.email" type="email" placeholder="Email" required />
          <input v-model="userForm.password" type="password" placeholder="Mot de passe" required />
          <button>Créer</button>
        </form>
  
        <form @submit.prevent="updateUser">
          <h3>Modifier un utilisateur</h3>
          <input v-model="userForm.id" placeholder="ID utilisateur" required />
          <input v-model="userForm.name" placeholder="Nouveau nom" />
          <input v-model="userForm.email" placeholder="Nouvel email" />
          <button>Modifier</button>
        </form>
  
        <form @submit.prevent="deleteUser">
          <h3>Supprimer un utilisateur</h3>
          <input v-model="userForm.id" placeholder="ID utilisateur" required />
          <button>Supprimer</button>
        </form>
      </section>
  
      <!-- FORMULAIRES CATWAY -->
      <section>
        <h2>Catways</h2>
        <form @submit.prevent="createCatway">
          <h3>Créer un catway</h3>
          <input v-model="catwayForm.catwayNumber" placeholder="Numéro" required />
          <input v-model="catwayForm.type" placeholder="Type (long/short)" required />
          <input v-model="catwayForm.catwayState" placeholder="État" required />
          <button>Créer</button>
        </form>
  
        <form @submit.prevent="updateCatway">
          <h3>Modifier état d'un catway</h3>
          <input v-model="catwayForm.id" placeholder="ID catway" required />
          <input v-model="catwayForm.catwayState" placeholder="Nouvel état" required />
          <button>Modifier</button>
        </form>
  
        <form @submit.prevent="deleteCatway">
          <h3>Supprimer un catway</h3>
          <input v-model="catwayForm.id" placeholder="ID catway" required />
          <button>Supprimer</button>
        </form>
  
        <form @submit.prevent="getCatwayDetails">
          <h3>Détails d'un catway</h3>
          <input v-model="catwayForm.id" placeholder="ID catway" required />
          <button>Afficher</button>
        </form>
      </section>
  
      <!-- FORMULAIRES RESERVATION -->
      <section>
        <h2>Réservations</h2>
        <form @submit.prevent="createReservation">
          <h3>Enregistrer une réservation</h3>
          <input v-model="reservationForm.catwayNumber" placeholder="Numéro catway" required />
          <input v-model="reservationForm.clientName" placeholder="Nom client" required />
          <input v-model="reservationForm.boatName" placeholder="Nom bateau" required />
          <input v-model="reservationForm.checkIn" type="date" required />
          <input v-model="reservationForm.checkOut" type="date" required />
          <button>Réserver</button>
        </form>
  
        <form @submit.prevent="deleteReservation">
          <h3>Supprimer une réservation</h3>
          <input v-model="reservationForm.id" placeholder="ID réservation" required />
          <button>Supprimer</button>
        </form>
  
        <form @submit.prevent="getReservationDetails">
          <h3>Détails d'une réservation</h3>
          <input v-model="reservationForm.id" placeholder="ID réservation" required />
          <button>Afficher</button>
        </form>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';
  
  defineOptions({
  name: 'DashboardPage'
    });

  const userStore = useUserStore();
  const headers = { Authorization: `Bearer ${userStore.token}` };
  
  const userForm = ref({ id: '', name: '', email: '', password: '' });
  const catwayForm = ref({ id: '', catwayNumber: '', type: '', catwayState: '' });
  const reservationForm = ref({ id: '', catwayNumber: '', clientName: '', boatName: '', checkIn: '', checkOut: '' });
  
  const createUser = async () => {
    await axios.post('http://localhost:3001/users', userForm.value, { headers });
  };
  
  const updateUser = async () => {
    await axios.put(`http://localhost:3001/users/${userForm.value.id}`, userForm.value, { headers });
  };
  
  const deleteUser = async () => {
    await axios.delete(`http://localhost:3001/users/${userForm.value.id}`, { headers });
  };
  
  const createCatway = async () => {
    await axios.post('http://localhost:3001/catways', catwayForm.value, { headers });
  };
  
  const updateCatway = async () => {
    await axios.patch(`http://localhost:3001/catways/${catwayForm.value.id}`, { catwayState: catwayForm.value.catwayState }, { headers });
  };
  
  const deleteCatway = async () => {
    await axios.delete(`http://localhost:3001/catways/${catwayForm.value.id}`, { headers });
  };
  
  const getCatwayDetails = async () => {
    const res = await axios.get(`http://localhost:3001/catways/${catwayForm.value.id}`, { headers });
    console.log(res.data);
  };
  
  const createReservation = async () => {
    await axios.post(`http://localhost:3001/catways/${reservationForm.value.catwayNumber}/reservations`, reservationForm.value, { headers });
  };
  
  const deleteReservation = async () => {
    await axios.delete(`http://localhost:3001/catways/any/reservations/${reservationForm.value.id}`, { headers });
  };
  
  const getReservationDetails = async () => {
    const res = await axios.get(`http://localhost:3001/catways/any/reservations/${reservationForm.value.id}`, { headers });
    console.log(res.data);
  };
  </script>
  
  <style scoped>
  .dashboard {
    max-width: 800px;
    margin: 0 auto;
  }
  form {
    margin-bottom: 1.5rem;
  }
  nav a {
    margin-right: 10px;
  }
  </style>
