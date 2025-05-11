<script setup lang="ts">
import { useRoute } from "vue-router";
import {onMounted, ref} from 'vue'
import UserHelper from "../helper/UserHelper";
import axios from "axios";
import NavigationButton from "./NavigationButton.vue";

const route = useRoute()

let post = ref([])
let userData = ref([])
let author = ref([])
const pId = route.params.id
// extract the api URL from .env file
const apiUrl=import.meta.env.VITE_API_URL;
onMounted( async () => {
  const user = UserHelper.authenticatedUser()
  // call the backend url VITE_API_URL to load post from JSONPlaceholder
  const res = await axios.post(apiUrl + '/posts/view', {
    email: user.email,
    postId: pId
  });
  // call the backend url VITE_API_URL to load post from JSONPlaceholder
  const userData = await axios.post(apiUrl + '/user', {
    email: user.email,
    userId: res.data.post.userId
  });
  author.value = Array.isArray(userData.data.user) ? userData.data.user : [userData.data.user]
  console.log('author: ' + res.data.post.userId)
  // convert data into an array POSTS
  post.value = Array.isArray(res.data.post) ? res.data.post : [res.data.post]  // Handle single object
  const authorUserId = res.data.post.userId
})
function formatDate(dateInput) {
  if (!dateInput) return ''
  const date = new Date(dateInput)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }
  return date.toLocaleString('en-US', options)
}

</script>

<template>
  <div class="container-fluid p-4" v-if="post.length">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="flex justify-between text-sm text-gray-500 border-t pt-4">
              <header style="margin: 0; padding: 0;">
                <i style="font-size: 30px" class="bi bi-book-half"> </i>
                <h3 class="text-uppercase" style="margin: 0; padding: 0; line-height: 1.2;">{{ post[0].title }}</h3>
                <i class="bi bi-person-fill"> </i><span style="margin: 0; padding: 0; font-size: 13px; line-height: 1.2;">Author: {{ author[0]?.name }}</span> |
                <i class="bi bi-calendar-check-fill"> </i> <span style="margin: 0; padding: 0; font-size: 13px; line-height: 1.2;">Created At {{ ( formatDate(post[0].createdAt)) }}</span> |
                <i class="bi bi-calendar-event-fill"> </i> <span style="margin: 0; padding: 0; font-size: 13px; line-height: 1.2;">Updated At {{ (formatDate(post[0].updatedAt)) }}</span>
              </header>
            </div>
            <div class="text-gray-700 mb-4 mt-3">
              <p class="text-lg leading-relaxed">{{ post[0].body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <navigation-button :post="post[0]" />
 </template>

<style scoped>

</style>