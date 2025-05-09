<template>
  <div class="mt-0 d-flex flex-column min-vh-100">
    <Navbar />
    <main class="flex-grow-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script setup>

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>
