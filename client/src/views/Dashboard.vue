<template>
  <div class="dashboard">
    <h1>Tableau de bord</h1>

    <!-- Navigation -->
    <nav>
      <router-link to="/catways">Liste des catways</router-link> |
      <router-link to="/reservations">Liste des réservations</router-link> |
      <router-link to="/documentation">Documentation</router-link>
      <button @click="logout" class="logout">Se déconnecter</button>
    </nav>

    <!-- Utilisateurs -->
    <section>
      <h2>Utilisateurs</h2>
      <form @submit.prevent="createUser">
        <input v-model="userForm.name" placeholder="Nom" required />
        <input v-model="userForm.email" type="email" placeholder="Email" required />
        <input v-model="userForm.password" type="password" placeholder="Mot de passe" required />
        <button :disabled="loading">Créer</button>
      </form>

      <form @submit.prevent="updateUser">
        <input v-model="userForm.id" placeholder="ID utilisateur" maxlength="24" required />
        <input v-model="userForm.name" placeholder="Nouveau nom" />
        <input v-model="userForm.email" placeholder="Nouvel email" />
        <button :disabled="loading">Modifier</button>
      </form>

      <form @submit.prevent="deleteUser">
        <input v-model="userForm.id" placeholder="ID utilisateur" maxlength="24" required />
        <button :disabled="loading">Supprimer</button>
      </form>
    </section>

    <!-- Catways -->
    <section>
      <h2>Catways</h2>
      <form @submit.prevent="createCatway">
        <input v-model="catwayForm.catwayNumber" placeholder="Numéro" required />
        <input v-model="catwayForm.type" placeholder="Type (long/short)" required />
        <input v-model="catwayForm.catwayState" placeholder="État" required />
        <button :disabled="loading">Créer</button>
      </form>

      <form @submit.prevent="updateCatway">
        <input v-model="catwayForm.id" placeholder="ID catway" maxlength="24" required />
        <input v-model="catwayForm.catwayState" placeholder="Nouvel état" required />
        <button :disabled="loading">Modifier</button>
      </form>

      <form @submit.prevent="deleteCatway">
        <input v-model="catwayForm.id" placeholder="ID catway" maxlength="24" required />
        <button :disabled="loading">Supprimer</button>
      </form>

      <form @submit.prevent="getCatwayDetails">
        <input v-model="catwayForm.id" placeholder="ID catway" maxlength="24" required />
        <button type="submit">Afficher</button>
      </form>
    </section>

    <!-- Réservations -->
    <section>
      <h2>Réservations</h2>
      <form @submit.prevent="createReservation">
        <input v-model="reservationForm.catwayNumber" placeholder="Numéro catway" required />
        <input v-model="reservationForm.clientName" placeholder="Nom client" required />
        <input v-model="reservationForm.boatName" placeholder="Nom bateau" required />
        <input v-model="reservationForm.checkIn" type="date" required />
        <input v-model="reservationForm.checkOut" type="date" required />
        <button :disabled="loading">Réserver</button>
      </form>

      <form @submit.prevent="deleteReservation">
        <input v-model="reservationForm.id" placeholder="ID réservation" maxlength="24" required />
        <button :disabled="loading">Supprimer</button>
      </form>

      <form @submit.prevent="getReservationDetails">
        <input v-model="reservationForm.id" placeholder="ID réservation" maxlength="24" required />
        <button>Afficher</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import api from '@/config/api';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();
const headers = { Authorization: `Bearer ${userStore.token}` };
const loading = ref(false);

const userForm = reactive({ id: '', name: '', email: '', password: '' });
const catwayForm = reactive({ id: '', catwayNumber: '', type: '', catwayState: '' });
const reservationForm = reactive({ id: '', catwayNumber: '', clientName: '', boatName: '', checkIn: '', checkOut: '' });

const resetForm = (form) => Object.keys(form).forEach(key => form[key] = '');

const logout = () => {
  userStore.logout();
  router.push('/');
  toast.info('Vous avez été déconnecté.');
};

const createUser = async () => {
  loading.value = true;
  try {
    await api.post('/users', userForm, { headers });
    toast.success('✅ Utilisateur créé !');
    resetForm(userForm);
  } catch (err) {
    toast.error("Erreur lors de la création de l'utilisateur");
  } finally {
    loading.value = false;
  }
};

const updateUser = async () => {
  loading.value = true;
  try {
    await api.put(`/users/${userForm.id}`, userForm, { headers });
    toast.success('🔁 Utilisateur modifié.');
    resetForm(userForm);
  } catch (err) {
    toast.error("Erreur lors de la modification");
  } finally {
    loading.value = false;
  }
};

const deleteUser = async () => {
  loading.value = true;
  try {
    await api.delete(`/users/${userForm.id}`, { headers });
    toast.info('🗑️ Utilisateur supprimé.');
    resetForm(userForm);
  } catch (err) {
    toast.error("Erreur lors de la suppression");
  } finally {
    loading.value = false;
  }
};

const createCatway = async () => {
  loading.value = true;
  try {
    await api.post('/catways', catwayForm, { headers });
    toast.success('✅ Catway créé !');
    resetForm(catwayForm);
  } catch (err) {
    toast.error("Erreur lors de la création du catway");
  } finally {
    loading.value = false;
  }
};

const updateCatway = async () => {
  loading.value = true;
  try {
    await api.patch(`/catways/${catwayForm.id}`, { catwayState: catwayForm.catwayState }, { headers });
    toast.success('🔁 État du catway mis à jour.');
    resetForm(catwayForm);
  } catch (err) {
    toast.error("Erreur lors de la mise à jour");
  } finally {
    loading.value = false;
  }
};

const deleteCatway = async () => {
  loading.value = true;
  try {
    await api.delete(`/catways/${catwayForm.id}`, { headers });
    toast.info('🗑️ Catway supprimé.');
    resetForm(catwayForm);
  } catch (err) {
    toast.error("Erreur lors de la suppression");
  } finally {
    loading.value = false;
  }
};

const getCatwayDetails = () => {
  if (!catwayForm.id) return;
  router.push(`/catway/${catwayForm.id}`);
};

const createReservation = async () => {
  if (new Date(reservationForm.checkOut) <= new Date(reservationForm.checkIn)) {
    toast.error("La date de fin doit être après la date de début !");
    return;
  }
  loading.value = true;
  try {
    await api.post(`/catways/${reservationForm.catwayNumber}/reservations`, reservationForm, { headers });
    toast.success('✅ Réservation enregistrée !');
    resetForm(reservationForm);
  } catch (err) {
    toast.error("Erreur lors de la réservation");
  } finally {
    loading.value = false;
  }
};

const deleteReservation = async () => {
  loading.value = true;
  try {
    await api.delete(`/catways/any/reservations/${reservationForm.id}`, { headers });
    toast.info('🗑️ Réservation supprimée.');
    resetForm(reservationForm);
  } catch (err) {
    toast.error("Erreur lors de la suppression");
  } finally {
    loading.value = false;
  }
};

const getReservationDetails = () => {
  if (!reservationForm.id) return;
  router.push(`/reservation/${reservationForm.id}`);
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
.logout {
  margin-left: 20px;
  background: transparent;
  border: none;
  color: #c00;
  cursor: pointer;
}
button {
  padding: 0.5rem 1rem;
  background-color: #284c3d;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;
}

button:hover {
  background-color: #3a6a54;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}
input {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
form {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f7f7f7;
}

</style>
