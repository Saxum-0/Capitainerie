<template>
  <div class="home">
    <h1>Bienvenue au Port de Plaisance de Russell</h1>
    <LoginForm />
    <router-link to="/documentation">Voir la documentation</router-link>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue';

    
defineOptions({
        name: 'DashboardPage'
      });

</script>

