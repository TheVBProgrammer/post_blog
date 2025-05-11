<script setup lang="ts">
import PostContent from "../components/PostContent.vue";
import { useRoute } from "vue-router";

const route = useRoute()
const pId = route.params.id
</script>

<template>
  <div class="container mt-5">
    <PostContent :postId="{ pId }" />
  </div>
</template>

<style scoped>

</style>