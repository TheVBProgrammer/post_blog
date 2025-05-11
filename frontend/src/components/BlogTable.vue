<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <table id="blogTable" class="table table-bordered table-striped w-100" style="width: 100%">
            <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td class="text-start">{{ post.title }}</td>
              <td style="width: 620px" class="text-start">{{ post.body }}</td>
              <td>
                <button class="btn btn-info btn-sm mb-1" @click="viewPost(post.id)">View</button>
                <button class="btn btn-warning btn-sm mb-1" @click="editPost(post.id)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">Delete</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import $ from 'jquery'
import 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import UserHelper from "../helper/UserHelper";
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();
// setup a reactive variable POSTS
const posts = ref([])
// extract the api URL from .env file
const apiUrl=import.meta.env.VITE_API_URL+'/posts';
// call the UserHelper to load the authenticated user account currently logged in
const user = UserHelper.authenticatedUser()

onMounted(async () => {
  // call the backend url VITE_API_URL to load post from local database ready for updating
  const res = await axios.post(apiUrl,{
    userId: user.id,
    email: user.email
  });
  // convert data into an array POSTS
  posts.value = Array.isArray(res.data.posts) ? res.data.posts : [res.data.posts] // Handle single object
  // use DataTable.net table plugins
  const interval = setInterval(()=>{
    // create constant variable blogTable to avoid duplicate query selector
    const blogTable=$('#blogTable')
    if (blogTable.length > 0){
      blogTable.DataTable()
      clearInterval(interval)
    }
  })
})
function viewPost(Id){
  router.push('/post/view/' + Id)
}
function editPost(Id) {
  router.push('/post/edit/' + Id)
}
</script>

<style scoped>

</style>