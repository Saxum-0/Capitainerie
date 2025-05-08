<template>
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #333;
}
</style>
