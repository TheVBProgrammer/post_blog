import axios from 'axios'
import dotenv from 'dotenv'
import Post from '../models/post.js'
import mongoose from 'mongoose'
import { HttpContext } from '@adonisjs/core/http'
import JsonPlaceholderProvider from '../Services/json_placeholder_provider.js'
import UserHelper from '../Services/user_helper.js'

dotenv.config()

export default class PostsController {
  public async index() {
    try {
      // Fetch the Resource URL from JsonPlaceholder
      const resUrl = process.env.RESOURCE_URL
      const mongoUri = process.env.MONGO_URI
      // Make sure the environment variable exists
      if (!resUrl) {
        return { message: 'RESOURCE_URL not defined in .env' }
      }
      // Check if data has already been inserted
      if (!(await this.CheckIfPostExists())) {
        // @ts-ignore
        await mongoose.connect(mongoUri)
        // fetch data from resource using axios
        const response = await axios.get(resUrl + '/posts')
        // assign data to posts variable
        const posts = response.data
        for (const postData of posts) {
          // insert record to Posts
          await Post.updateOne(
            {
              userId: postData.userId,
              id: postData.id,
              title: postData.title,
              body: postData.body,
            },
            postData,
            { upsert: true }
          )
        }
      }
    } catch (error) {
      console.error('Error Fetching posts: ', error)
      return { message: 'Failed to fetch posts.' }
    }
  }

  /**
   * @description View Post by postId
   * @param params
   * @param response
   */
  public async view({ request, response }: HttpContext) {
    // get the email from request variable
    const email = request.input('email')
    // get the token passed as headers
    const token = (request.header('Authorization') || '').replace('Bearer ', '')
    // get the postId or shall
    const postId = request.input('id')
    // Verify token passed from header
    const isValid = await UserHelper.verify(email, token)
    if (isValid) {
      // query now post record
      const post = await JsonPlaceholderProvider.findPostByPostId(postId)
      return post.data
    } else {
      return response.unauthorized({ success: false, message: 'Invalid token or user' })
    }
  }

  /**
   * @description Load post by UserId
   * @param params
   * @param response
   */
  public async load_post({ params, response }: HttpContext) {
    // @ts-ignore
    const userId = params.id
    // load the post from resource (https://jsonplaceholder.typicode.com/posts)
    const posts = await JsonPlaceholderProvider.findPostByUserId(userId)
    //return JSON
    response.send(posts.data)
  }
  private async CheckIfPostExists() {
    try {
      const count = await Post.countDocuments()
      return count > 0
    } catch (error) {
      return false
    }
  }
}
