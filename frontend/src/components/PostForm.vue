<script setup>
import axios from "axios";
import UserHelper from "../helper/UserHelper";
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const props = defineProps({
  postId: {
    type: [ String, Number],
    required: true
  }
})
// State of Post Model
const post = ref({
  Id: null,
  title: '',
  body: '',
  userId: null,
  createdAt: null,
  updatedAt: null
})
// extract the api URL from .env file
const apiUrl = import.meta.env.VITE_API_URL;
const fetchPost = async () => {
  try{
    // Call the UserHelper and extract the authenticated user
    const user = UserHelper.authenticatedUser()
    // extract the id from route
    const pId = props.postId
    // get the extracted APIUrl from .env
    let Url = apiUrl + '/post/edit/' + pId;
    // Fetch the data
    const result = await axios.post(Url, {
      postId: pId,
      email: user.email
    });
    // Set the reactive post variable and make sure
    post.value = result.data.post
  } catch (err) {
    // Handle the error (assumes you are not in a controller, so no `response.badRequest`)
    console.error('Failed to fetch post:', err);
  }
}
// Submit Form
const SubmitForm = async () => {
  try{
    const pId = props.postId
    // get the extracted APIUrl from .env
    let Url = apiUrl + '/post/edit/' + pId;
    await axios.put(Url, post.value)
    alert('Post updated successfully!')
    await router.push('/posts')
  } catch (err) {
    console.error('Failed to update post:', error)
    alert('Failed to update post.')
  }
}
const deletePost = async () => {
  const pId = props.postId
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
//
watch(() => props.postId, fetchPost, { immediate: true})

</script>

<template>
<div class="container-fluid p-4" style="width: 700px">
  <div class="row">
    <div class="col-12">
      <form @submit.prevent="SubmitForm">
        <div class="row">
          <div class="col-md-12">
            <label class="control-label" for="title">Title</label>
            <input type="text" class="form-control" v-model="post.title"/>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <label class="control-label" for="body">Body</label>
            <textarea class="form-control overflow-y-auto" rows="8" v-model="post.body"></textarea>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-12 text-end">
            <router-link class="btn btn-outline-primary btn-sm" to="/post/new"><i class="bi-arrow-return-left"></i> Add New Post</router-link>
            <button class="btn btn-outline-danger btn-sm me-1 ms-1" @click="deletePost" type="button"><i class="bi bi-trash-fill"></i> Delete</button>
            <button class="btn btn-outline-success btn-sm me-1" type="submit"><i class="bi bi-save"></i> Update</button>
            <router-link class="btn btn-outline-info btn-sm" to="/posts"><i class="bi-arrow-return-left"></i> Go Back</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>dv