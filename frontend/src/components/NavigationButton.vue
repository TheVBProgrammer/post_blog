<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const postId = parseInt(route.params.id)

const goToPrevious = () => {
  if (postId > 1) {
    router.push(`/post/view/${postId - 1}`)
    window.location.reload()
  }
}

const goToNext = () => {
  router.push(`/post/view/${postId + 1}`)
  window.location.reload()
}
</script>

<template>
  <div class="text-center mt-4">
    <button
        class="btn btn-outline-primary me-2"
        :disabled="postId <= 1"
        @click="goToPrevious"
    >
      <i class="bi bi-arrow-left-circle"></i> Previous
    </button>

    <button
        class="btn btn-outline-primary"
        @click="goToNext"
    >
      Next <i class="bi bi-arrow-right-circle"></i>
    </button>
  </div>
</template>

<style scoped>

</style>