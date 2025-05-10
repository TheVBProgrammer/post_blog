<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <form @submit.prevent="login" class="border rounded shadow p-4 bg-white">
      <!-- Bar Above Email -->
      <div class="d-flex justify-content-center align-items-center mb-4" style="min-height: 30px;">
        <div class="border-bottom w-100 text-center mt-0">
          <strong>Account Info</strong>
        </div>
      </div>
      <!-- Email Row -->
      <div class="row mb-3 align-items-center">
        <label class="col-4 col-form-label">Email</label>
        <div class="col-8">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-envelope"></i>
            </span>
            <input type="email" v-model="email" class="form-control" placeholder="Enter email" required />
          </div>
        </div>
      </div>
      <!-- Password Row -->
      <div class="row mb-3 align-items-center">
        <label class="col-4 col-form-label">Password</label>
        <div class="col-8">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-lock"></i>
            </span>
            <input type="password" v-model="password" class="form-control" placeholder="Enter password" required />
          </div>
        </div>
      </div>
      <!-- Login Button Aligned to Right -->
      <div class="text-end">
        <button type="submit" class="btn btn-success"><i class="bi-box-arrow-in-right"></i> Login</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router=useRouter();
const email = ref('');
const password = ref('');

//sessionStorage.clear(); //-> clear all session in browser
const login = async () =>{
  try{ //'http://localhost:3333/login'
    const apiUrl=import.meta.env.VITE_API_URL+'/login';
    const res = await axios.post(apiUrl, {
      email: email.value,
      password: password.value
    });
    // save token on Session Storage Utility
    sessionStorage.setItem('token',res.data.token);
    sessionStorage.setItem('auth_user',JSON.stringify(res.data.user));
    // redirect page to dashboard after successful verification
    await router.push('/dashboard');
  }catch(err){ // Handle Error in case there is
    if (err.response && err.response.data && err.response.data.message) {
      alert('Login failed: ' + err.response.data.message);
    } else {
      alert('Unexpected error: ' + err.message);
    }
  }
};

</script>