<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import UserHelper from "../helper/UserHelper"
import {defineProps, computed} from 'vue'
import axios from "axios";

// Define the post prop to receive data from the parent component
const props = defineProps<{
  post: {
    userId: Number
  },
}>()
// extract the api URL from .env file
const apiUrl = import.meta.env.VITE_API_URL;

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
const deletePost = async () => {
  const pId = postId
  const confirmed = confirm('Are you sure you want to delete this post?')
  if (confirmed) {
    try {
      let Url = apiUrl + '/post/delete/' + pId;
      const res = await axios.delete(Url)
      if (res.data.ErrorNumber===0) {
        // NO error on deletion return by API
        alert(res.data.Message)
        // navigate to the POST List
        await router.push('/posts')
      }else{ // has error return
        console.log(res)
        alert(res.data.Message)
      }
    } catch(err) {
      console.log('System Error: ' + err)
      alert('Failed to delete post!')
    }
  }
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
    <router-link class="btn btn-outline-info" to="/posts"><i class="bi-arrow-return-left"></i> Go Back</router-link>
    <button
        class="btn btn-outline-primary ms-1"
        @click="goToNext"
    >
      Next <i class="bi bi-arrow-right-circle"></i>
    </button>

  </div>
</template>

<style scoped>

</style>