<script setup lang="ts">
import axios from "axios";
import UserHelper from "../helper/UserHelper";
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
// Call the UserHelper and extract the authenticated user
const user = UserHelper.authenticatedUser()
// State of Post Model
const post = ref({
  Id: null,
  title: '',
  body: '',
  userId: user.id,
})
// extract the api URL from .env file
const apiUrl = import.meta.env.VITE_API_URL + '/post/create';
const submitPost = async () => {
  try {
    // send to backend request to add record authorizing using email and token as header of axios
    const result = await axios.post(apiUrl, post.value);
    // redirect to posts page
    await router.push('/posts')
  } catch(err) {
    console.error('Error: ' + err)
    alert('Failed to create post!')
  }
}
</script>

<template>
  <div class="container-fluid p-4" style="width: 700px">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="submitPost">
          <div class="row">
            <div class="col-md-12">
              <label class="control-label" for="title">Title</label>
              <input type="text" class="form-control" required v-model="post.title"/>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label class="control-label" for="body">Body</label>
              <textarea class="form-control overflow-y-auto" required rows="8" v-model="post.body"></textarea>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12 text-end">
              <button class="btn btn-outline-success btn-sm me-1" type="submit"><i class="bi bi-save"></i> Save</button>
              <router-link class="btn btn-outline-info btn-sm" to="/posts"><i class="bi-arrow-return-left"></i> Go Back</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>