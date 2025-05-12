<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from 'vue'
import PostForm from "../components/PostForm.vue";

// Use useRoute from vue-router
const route = useRoute()

const postId = ref(route.params.id)

</script>

<template>
  <div class="container mt-5 col-12">
     <div class="card">
       <div class="card-header">
         <h4>Edit Post</h4>
       </div>
       <div class="card-body">
          <PostForm v-if="postId" :post-id="postId"/>
       </div>
     </div>
  </div>
</template>

<style scoped>

</style>