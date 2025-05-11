<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import UserHelper from "../helper/UserHelper"
import {defineProps, computed} from 'vue'

// Define the post prop to receive data from the parent component
const props = defineProps<{
  post: {
    userId: Number
  },
}>()

const router = useRouter()
const route = useRoute()
// get the current logged User via UserHelper
const user = UserHelper.authenticatedUser()
// The Authenticated User
const authenticatedUserId = user.id
// Get the current postID
const postId = parseInt(route.params.id)
const goToPrevious = () => {
  if (postId > 1) {
    // Navigate to previous Post
    document.location=`/post/view/${postId - 1}`
  }
}
const goToNext = () => {
  // Navigate to next post
  document.location=`/post/view/${postId + 1}`
}
const editPost = () => {
  document.location=`/post/edit/${postId}`
}
/**********************************************************/
// This serves as a safeguard to prevent users from editing or deleting posts that did not belong to them.
const canEdit = computed(() => props.post?.userId === authenticatedUserId)
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
    <!-- Edit Button -->
    <button v-if="props.post?.userId === authenticatedUserId"
        class="btn btn-outline-warning me-2"
        @click="editPost"
    >
      <i class="bi bi-pencil"></i> Edit
    </button>

    <!-- Delete Button -->
    <button v-if="canEdit"
        class="btn btn-outline-danger me-2"
        @click="deletePost"
    >
      <i class="bi bi-trash"></i> Delete
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