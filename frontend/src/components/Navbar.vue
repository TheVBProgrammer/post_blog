<template>
  <nav class="navbar navbar-expand-lg light fixed-top py-3 fixed-top" id="mainNav">
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
            <button @click.prevent="logout" v-if="isLoggedIn" class="nav-link">Logout</button>
          </li>
          <li class="nav-item">
            <router-link to="/login" v-if="!isLoggedIn" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import axios from "axios";
import UserHelper from '../helper/UserHelper'
const router=useRouter();

//check if login and save to a variable
const isLoggedIn = UserHelper.isLogin()
async function logout() {
  const token = localStorage.getItem('token')
  console.log(token)
  const apiUrl = import.meta.env.VITE_API_URL + '/logout';
  console.log(apiUrl)
  const res = await axios.post(apiUrl, {
    token: token,
  });
  // remove auth data
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  await router.push('/login')
}
</script>
<style scoped>

</style>