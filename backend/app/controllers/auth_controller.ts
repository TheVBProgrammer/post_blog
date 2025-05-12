import { HttpContext } from '@adonisjs/core/http'
import dotenv from 'dotenv'
import User from '#models/user'
import JsonPlaceholderProvider from '../Services/json_placeholder_provider.js'
import { randomUUID } from 'node:crypto'

// allow to use process.env
dotenv.config()
export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { email } = request.only(['email'])
    //Simulate token creation
    const token = randomUUID()
    try {
      //check if user is already logged
      const loggedUser = await User.findOne({ email: email })
      if (!loggedUser) {
        // user is not logged
        // get the JSONPlaceholderProvider class and find by email
        const user = await JsonPlaceholderProvider.findByEmail(email)
        // check if user is not null for simulated login authentication
        if (!user) {
          // issue an unauthorized message to user
          return response.unauthorized({ message: 'Invalid Credentials' })
        }
        // now save user credentials to mongoose database
        const authenticatedUser = await User.findOneAndUpdate(
          { email: user.email }, // match by email
          {
            $set: {
              id: user.id,
              name: user.name,
              email: user.email,
              token: token,
            },
          },
          {
            upsert: true, // ->create new if not found
            new: true, // ->return teh updated document
            setDefaultsOnInsert: true, //optional: apply schema defaults of inserting
          }
        )
        // return message to capture via an api access
        return response
          .status(200)
          .send({ message: 'Login Successful.', token: token, user: authenticatedUser })
      } else {
        // User is not logged in, insert/update user details
        const authenticatedUser = await User.findOneAndUpdate(
          { email: email }, // match by email
          {
            $set: {
              token: token,
            },
          },
          {
            upsert: true, // ->create new if not found
            new: true, // ->return teh updated document
            setDefaultsOnInsert: true, //optional: apply schema defaults of inserting
          }
        )
        // return message to capture via an api access
        return response
          .status(200)
          .send({ message: 'Login Successful.', token: token, user: authenticatedUser })
      }
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Authentication Failed, please try again.', token: null, user: null })
    }
  }

  /**
   * @description Logout action
   * @param request
   * @param response
   */
  public async logout({ request, response }: HttpContext){
    const token = request.input('token')
    // Remove and invalidate token in mongoDB model
    await User.findOneAndUpdate({ token }, { token: null })
    // let system know of logging out
    return response.ok({ message: 'Logged out successfully' })
  }

  /**
   * @description User Profile Action
   * @param request
   */
  public async profile({ request }: HttpContext) {
    const token = request.header('Authorization')?.replace('Bearer ', '')
    const user = await User.findOne({ token })
    if (!user) {
      return { message: 'Invalid token' }
    }
    return token
    //return { message: 'Ok', user }
  }
}
