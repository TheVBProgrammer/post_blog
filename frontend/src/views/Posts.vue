<template>
  <div class="container mt-5">
    <h4>List of my Blogs</h4>
  </div>
  <BlogTable  /><!-- Vue Component for Blog Post -->
</template>
<script setup>
// Import blog from component
import BlogTable from "../components/BlogTable.vue";
import { useRoute } from "vue-router";

const route = useRoute()

</script>

<style scoped>

</style>