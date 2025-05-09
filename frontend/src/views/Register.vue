<template>
  <form @submit.prevent="register">
    <div class="form-grid">
      <div class="form-group">
        <label for="firstName">User Name</label>
        <input type="text" v-model="username" placeholder="Username"/>
      </div>
      <div class="form-group">
        <label for="firstName">Email</label>
        <input type="email" v-model="email" placeholder="Email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" placeholder="Password" />
      </div>
    <button class="">Register</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';

const router =useRouter();
const username=ref('');
const email = ref('');
const password = ref('');

const register = async () =>{
  try{
    const apiUrl=import.meta.env.VITE_API_URL;
    console.log(apiUrl);
    await axios.post(apiUrl+'/auth/register',{
      username: username.value,
      email: email.value,
      password: password.value
    });
    await router.push('/login');
  }catch(err){
    alert('Registration Failed');
  }
};

</script>