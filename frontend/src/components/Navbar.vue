<template>
  <nav class="navbar navbar-expand-lg light fixed-top py-3 fixed-top navbar-light bg-light shadow-sm custom-navbar" id="mainNav">
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand" href="#page-top">POST Blog</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto my-2 my-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/posts" v-if="isLoggedIn" class="nav-link">Posts</router-link>
          </li>
          <li class="nav-item">
            <button @click.prevent="logout" v-if="isLoggedIn" class="nav-link" :title="btnTitle">Logout</button>
          </li>
          <li class="nav-item">
            <router-link to="/login" v-if="!isLoggedIn" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
<style scoped>
.custom-navbar .nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 0.25rem;
  font-weight: 500;
}

.custom-navbar .nav-link:hover {
  background-color: #f0f0f0; /* Hover highlight */
  box-shadow: inset 1px 1px 2px rgba(255, 255, 255, 0.6),
  inset -1px -1px 2px rgba(0, 0, 0, 0.1); /* Embossed effect */
  color: #000;
}
</style>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import axios from "axios";
import UserHelper from '../helper/UserHelper'
import {onMounted, ref} from "vue";

const router=useRouter();
//check if login and save to a variable
const isLoggedIn = UserHelper.isLogin()
// Button title
const btnTitle = ref('log Out')
//change button title based on user
function changeTitle() {
  const user = UserHelper.authenticatedUser()
  if (user) {
    btnTitle.value = 'Logout ' + user.name
  }
}
// Call change Title when component mounts
onMounted(()=>{
  changeTitle()
})
// Logout function
async function logout() {
  const token = sessionStorage.getItem('token')
  const apiUrl = import.meta.env.VITE_API_URL + '/logout';
  console.log(token)
  const res = await axios.post(apiUrl, {
    token: token,
  });
  console.log(res.data.message)
  // remove auth data token
  sessionStorage.removeItem('token')
  // remove auth_user session
  sessionStorage.removeItem('auth_user')
  // redirect to login page
  await router.push('/login')
}
</script>