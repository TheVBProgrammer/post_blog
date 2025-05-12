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
        <div class="row mt-1">
          <div class="col-md-12 text-end">
            <button class="btn btn-success btn-sm" type="submit"><i class="bi bi-save"></i> Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>dv