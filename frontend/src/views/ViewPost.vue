<script setup lang="ts">
import PostContent from "../components/PostContent.vue";
import router from "../router/index";

console.log(router.getRoutes())
</script>

<template>
  <div class="container mt-5">
    <PostContent />
  </div>
</template>

<style scoped>

</style>