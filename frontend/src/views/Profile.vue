<template>
  <form @submit.prevent="register">
    <div class="form-grid">
      <div class="form-group">
        <label for="firstName">User Name</label>
        <input type="text" v-model="username" placeholder="Username"/>
      </div>
      <div class="form-group">
        <label for="firstName">FirstName</label>
        <input type="text" v-model="first_name" placeholder="First Name" />
      </div>
      <div class="form-group">
        <label for="password">Middle Name</label>
        <input type="text" v-model="middle_name" placeholder="Middle Name" />
      </div>
      <div class="form-group">
        <label for="password">Last Name</label>
        <input type="text" v-model="last_name" placeholder="Last Name" />
      </div>
      <div class="form-group">
        <label for="password">Address</label>
        <textarea rows="4" v-model="address"></textarea>
      </div>
      <button class="">Save</button>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router=useRouter();
const user_id =ref('');
const first_name=ref('');
const last_name=ref('');
const middle_name=ref('');
const address=ref('');

const profile=async () =>{
  try{
    const apiUrl=import.meta.env.VITE_API_URL+'/auth/profile';
    const res = await axios.post(apiUrl,{
      first_name: first_name.value,
      last_name: last_name.value,
      middle_name: middle_name.value,
      address: address.value
    });
    console.log('Successfully save profile');
    await router.push('/profile');
  }catch(err){
    if (err.response && err.response.data && err.response.data.message) {
      alert('Record failed to save: ' + err.response.data.message);
    } else {
      alert('Unexpected error: ' + err.message);
    }
  }
}

</script>