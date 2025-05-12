import dotenv from 'dotenv'
import User from '../mongoose/Models/users.js'
import mongoose from 'mongoose'
import axios from 'axios'
import { HttpContext } from '@adonisjs/core/http'
import UserHelper from '../Services/user_helper.js'
import JsonPlaceholderProvider from '../Services/json_placeholder_provider.js'

// Enable process.env
dotenv.config()
/**
 * @description User Controller
 */
export default class UsersController {
  public async index() {
    try {
      // Fetch the Resource URL from JsonPlaceholder
      const resUrl = process.env.RESOURCE_URL
      const mongoUri = process.env.MONGO_URI
      // Make sure the environment variable exists
      if (!resUrl) {
        return { message: 'RESOURCE_URL not defined in .env' }
      }
      // @ts-ignore
      await mongoose.connect(mongoUri)
      // Check if data has already been inserted
      if (!(await this.CheckIfExists())) {
        const response = await axios.get(resUrl + '/users')
        const users = response.data
        // fetch data from resource using mongoose model thru iteration on json array
        for (const userData of users) {
          // create a local copy of users
          await User.updateOne({ id: userData.id }, userData, { upsert: true })
        }
        // display that the record save successfully
        console.log('All users imported successfully!')
      } else {
        // Table has been created
        return 'Users Table Created.'
      }
    } catch (error) {
      // Handle Error
      console.error('Error Fetching users: ', error)
      return { message: 'Failed to fetch Users.' }
    }
  }

  /**
   * @description Check if user does exists
   * @constructor
   * @private
   */
  private async CheckIfExists() {
    try {
      //count number of documents in User Collections
      const count = await User.countDocuments()
      // return boolean true/false
      return count > 0
    } catch (error) {
      return false
    }
  }

  /**
   * @description Get user account details
   * @param request
   * @param response
   */
  public async getUser({ request, response }: HttpContext) {
    // get the email from request variable
    const email = request.input('email')
    // get the postId from parameter
    const userId = request.input('userId')
    // get the token passed as headers
    const token = (request.header('Authorization') || '').replace('Bearer ', '')
    // Verify token passed from header
    const isValid = await UserHelper.verify(email, token)
    if (isValid) {
      try {
        //query Post by userId or by its author
        const userData = await JsonPlaceholderProvider.findById(userId)
        // return response success
        return response.ok({
          success: true,
          message: 'Query of User Successfully done!',
          user: userData,
        })
      } catch (err) {
        // Failed return the system error message
        return response.badRequest({ success: false, message: err.message })
      }
    }
    // Failed on authorization access
    return response.unauthorized({ success: false, message: 'Invalid token or email' })
  }
}
