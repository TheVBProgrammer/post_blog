import axios from 'axios'
import dotenv from 'dotenv'
import Post from '../models/post.js'
import mongoose from 'mongoose'
import { HttpContext } from '@adonisjs/core/http'
import UserHelper from '../Services/user_helper.js'

// enable process.env
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
          // insert record to Posts and Update
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
      // Handle Error and notify users
      console.error('Error Fetching posts: ', error)
      return { message: 'Failed to fetch posts.' }
    }
  }

  /**
   * @description View Post by postId
   * @param params
   * @param response
   */
  public async show({ request, response }: HttpContext) {
    // get the email from request variable
    const email = request.input('email')
    // get the postId from parameter
    const postId = request.input('postId')
    // get the token passed as headers
    const token = (request.header('Authorization') || '').replace('Bearer ', '')
    // Verify token passed from header
    const isValid = await UserHelper.verify(email, token)
    if (isValid) {
      try {
        //query Post by userId or by its author
        const post = await Post.findOne({ id: Number.parseInt(postId) })
        return response.ok({
          success: true,
          message: 'Query of Posts Successfully done!',
          post: post,
        })
      } catch (err) {
        // handle Error
        return response.badRequest({ success: false, message: err.message })
      }
    }
    // handle Error
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
      try {
        //query Post by userId or by its author
        const posts = await Post.find({ userId: Number.parseInt(userId) })
        // send the result as successful
        return response.ok({
          success: true,
          message: 'Query of Posts Successfully done!',
          posts: posts,
        })
      } catch (err) {
        // an Error occurred, notify the user
        return response.badRequest({ success: false, message: err.message })
      }
    }
    return response.unauthorized({ success: false, message: 'Invalid token or email' })
  }

  /**
   * @description Check if Post exists or not
   * @constructor
   * @private
   */
  private async CheckIfPostExists() {
    try {
      // count documents in Post Collections
      const count = await Post.countDocuments()
      // return boolean true/false
      return count > 0
    } catch (error) {
      // on Error return false
      return false
    }
  }

  /**
   * @description Destroy or delete Post
   * @param params
   * @param response
   */
  public async destroy({ params, response }: HttpContext) {
    // Query the Post model and filter by Id
    const post = await Post.findOne({ id: Number.parseInt(params.id) })
    // check for null post and return message to the user
    if (!post) {
      /*
        Custom Error Code:
        40401 = Post not Found
        50001 = Server Error, Deletion Failed
       */
      return response.status(404).json({
        ErrorNumber: 40401,
        Message: 'Post not found',
      })
    }
    try {
      // now everything is ok, Post record found it's time to issue the delete statement
      await post.deleteOne()
      // return status to user
      return response.ok({
        ErrorNumber: 0,
        Message: 'Post deleted successfully!',
      })
    } catch (err) {
      // return status to user
      return response.status(500).json({
        ErrorNumber: 500,
        message: err,
      })
    }
  }

  /**
   * @description Store or Save Record to database
   * @param request
   * @param response
   */
  public async store({ request, response }: HttpContext){
    try {
      // extract title, body and userId from request object
      const { title, body, userId } = request.only(['title', 'body', 'userId'])
      // check Post for the last generated Id
      const newPost = await Post.findOne().sort({ id: -1 }).exec()
      // Increment id by 1
      const newId = newPost ? newPost.id + 1 : 1
      console.log({ title, body, userId, newId })
      // create now the new POST entry
      const post = await Post.create({
        userId: userId,
        id: newId,
        title: title,
        body: body,
      })
      // return status of saving
      return response.created({
        ErrorNumber: 0,
        Message: 'Post created successfully!',
        data: post,
      })
    } catch (err) {
      return response.status(500).json({
        ErrorNumber: 50001,
        Message: 'Server Error while Posting.',
        data: null,
      })
    }
  }

  /**
   * @description Update record/Post
   * @param params
   * @param request
   * @param response
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      // Get the id from params
      const { Id } = params
      // extract params from request
      const { title, body, userId } = request.only(['title', 'body', 'userId'])
      // Find and Update Using Mongoose Model POST
      const updatedPost = await Post.findOneAndUpdate(
        { id: Id },
        { title, body, userId },
        { new: true }
      )
      //if insert/Update fails
      if (!updatedPost) {
        // return status 404 or not Found
        return response.status(404).json({ message: 'Post not Found' })
      }
      // Return Success posting of data
      return response.json({
        ErrorNumber: 0,
        Message: 'Post updated Successfully',
        Data: updatedPost,
      })
    } catch (err) {
      // handle Error on update Post
      return response.status(500).json({
        ErrorNumber: 500,
        message: 'Failed to update post.',
        Data: null,
      })
    }
  }

  /**
   * @description Edit Post Entry
   * @param request
   * @param response
   */
  public async edit({ request, response }: HttpContext) {
    // get the email from request variable
    const email = request.input('email')
    //
    const postId = request.input('postId')
    // get the token passed as headers
    const token = (request.header('Authorization') || '').replace('Bearer ', '')
    // Verify token passed from header
    const isValid = await UserHelper.verify(email, token)
    if (isValid) {
      try {
        // search Post by postId
        const row = await Post.findOne({ id: Number.parseInt(postId) })
        // Return as response OK passing row as post json
        return response.ok({
          success: true,
          message: 'The specified Posts Successfully done!',
          post: row,
        })
      } catch (err) {
        // an Error occurred, notify the user
        return response.badRequest({ success: false, message: err.message })
      }
    } else {
      // Handle Error Unauthorized access
      return response.unauthorized({ success: false, message: 'Invalid token or email' })
    }
  }

  /**
   * @description Synchronize Post from JSONPlaceHolder to local database mongoDB to enable update/delete/add
   * @param request
   * @param response
   */
  public async postSynchronize({ request, response }: HttpContext) {
    // get the email from request variable
    const email = request.input('email')
    // get the token passed as headers
    const token = (request.header('Authorization') || '').replace('Bearer ', '')
    // Verify token passed from header
    const isValid = await UserHelper.verify(email, token)
    if (isValid) {
      try {
        //Synchronize Post using UserHelper
        const rows = await UserHelper.SynchronizePost()
        return response.ok({
          success: true,
          message: 'Synchronization of Posts Successfully done!',
          posts: rows,
        })
      } catch (err) {
        // an Error occurred, notify the user
        return response.badRequest({ success: false, message: err.message })
      }
    } else {
      // Handle Error an unauthorized access
      return response.unauthorized({ success: false, message: 'Invalid token or email' })
    }
  }
}
