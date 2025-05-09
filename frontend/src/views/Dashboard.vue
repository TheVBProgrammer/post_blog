<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
      <div class="col-lg-8 align-self-end">
        <h1 class="text-white font-weight-bold">JSONPlaceholder</h1>
        <hr class="divider" />
      </div>
      <div class="col-lg-8 align-self-baseline">
        <p class="text-white-75 mb-5">A simple web application that allows users to view, create, update, and delete posts. This application will consist of a backend built with <i><strong>AdonisJS and Node.js</strong></i> and a frontend developed with <strong>Vue.js.</strong></p>
        <a class="btn btn-primary btn-xl" href="/login">Find Out More</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import router from "../router/index.js";

const message=ref('');
const token =sessionStorage.getItem('token');
console.log('token: ' + token)
//computed property
const isAuthenticated = computed(()=>!!sessionStorage.getItem('token'));
// Logout
function logout(){
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('auth_user');
  router.push('/');
}
onMounted(async () =>{
  try{
    const apiUrl=import.meta.env.VITE_API_URL;
    const res =await axios.get(apiUrl+'/auth/dashboard',{
      headers: { Authorization: `Bearer ${token}`}
    });
    message.value=res.data.message;
    console.log(res.data.message)
  }catch(err){
    message.value='Unauthorized';
  }
});

</script>