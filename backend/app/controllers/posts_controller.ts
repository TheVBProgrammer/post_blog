import axios from 'axios'
import dotenv from 'dotenv'
import Post from '../models/post.js'
import mongoose from 'mongoose'
import { HttpContext } from '@adonisjs/core/http'
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
    // get the postId from parameter
    const postId = request.input('postId')
    // get the token passed as headers
    const token = (request.header('Authorization') || '').replace('Bearer ', '')
    // Verify token passed from header
    const isValid = await UserHelper.verify(email, token)
    if (isValid) {
      //query Post by userId or by its author
      const post = await Post.findOne({ id: Number.parseInt(postId) })
      return response.ok({
        success: true,
        message: 'Query of Posts Successfully done!',
        post: post,
      })

    }
    return response.unauthorized({ success: false, message: 'Invalid token or email' })
  }

  /**
   * @description Load post by UserId
   * @param params
   * @param response
   */
  public async load_post({ request, response }: HttpContext) {
    // @ts-ignore
    const userId = request.input('userId')
    const email = request.input('email')
    // get the token passed as headers
    const token = (request.header('Authorization') || '').replace('Bearer ', '')
    // Verify token passed from header
    const isValid = await UserHelper.verify(email, token)
    if (isValid) {
      //query Post by userId or by its author
      const posts = await Post.find({ userId: Number.parseInt(userId) })
      return response.ok({
        success: true,
        message: 'Query of Posts Successfully done!',
        posts: posts,
      })
    }
    return response.unauthorized({ success: false, message: 'Invalid token or email' })
  }
  private async CheckIfPostExists() {
    try {
      const count = await Post.countDocuments()
      return count > 0
    } catch (error) {
      return false
    }
  }
  public async postSynchronize({ request, response }: HttpContext) {
    // get the email from request variable
    const email = request.input('email')
    // get the token passed as headers
    const token = (request.header('Authorization') || '').replace('Bearer ', '')
    // Verify token passed from header
    const isValid = await UserHelper.verify(email, token)
    if (isValid) {
      //Synchronize Post using UserHelper
      const rows = await UserHelper.SynchronizePost()
      return response.ok({
        success: true,
        message: 'Synchronization of Posts Successfully done!',
        posts: rows,
      })
    } else {
      return response.unauthorized({ success: false, message: 'Invalid token or email' })
    }
  }
}
