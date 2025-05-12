import User from '#models/user'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import axios from 'axios'
import Posts from '../models/post.js'

dotenv.config()
/**
 * @Description This is User Helper Class created by Eng'r Nolan Sunico
 */
export default class UserHelper {
  /**
   * @description Verify Access Token against session variable
   * @param email
   * @param token
   */
  static async verify(email: string, token: string) {
    try {
      // search mongoDB User logged session
      return await User.findOne({ email: email, token: token })
    } catch (error) {
      console.error('Verification Failed', error)
      return false
      //return { errorNumber: 500, message: 'Server error during verification' }
    }
  }

  /**
   * @Description Synchronized Post from JSONPlaceholder for local MongoDB
   * @constructor
   */
  static async SynchronizePost() {
    const resUrl = process.env.RESOURCE_URL
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME
    const mongoUri = process.env.MONGO_URI
    // Ensure mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri + '/' + MONGO_DB_NAME)
    }
    // fetch all data from resource using axios
    const response = await axios.get(resUrl + '/posts')
    // assign data to rows variable
    const rows = response.data
    for (const postData of rows) {
      // insert record to Posts
      await Posts.updateOne(
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
    // display all posts
    // now return it
    return Posts.find()
  }

  /**
   * @description Check if Post Collection does Exists
   */
  static async doesPostCollectionExist(): Promise<boolean> {
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME
    const mongoUri = process.env.MONGO_URI
    // Ensure mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri + '/' + MONGO_DB_NAME)
    }
    // setup DB
    const db = mongoose.connection.db
    if (!db) {
      throw new Error('Database connection is not established.')
    }
    // extracts collections from mongoDB No-SQL database
    const collection = await db.listCollections().toArray()
    // check for Posts Collection if exists
    return collection.some((col) => col.name === 'posts') // 'Posts' is the default name for Post model
  }
}
