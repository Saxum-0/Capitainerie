<template>
  <button @click="toast.success('🎉 Test toast !')">
    Lancer un toast
  </button>
</template>

<script setup>
import { useToast } from 'vue-toastification';
const toast = useToast();
</script>
