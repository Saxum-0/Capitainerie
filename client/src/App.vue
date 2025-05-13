<template>
  <Navbar />
  <Toastest />
  <router-view />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Toastest from './components/toastest.vue';
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
