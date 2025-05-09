import dotenv from 'dotenv'
import User from '../mongoose/Models/users.js'
import mongoose from 'mongoose'
import axios from 'axios'

dotenv.config()

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
        return 'Users Table Created.'
      }
    } catch (error) {
      console.error('Error Fetching users: ', error)
      return { message: 'Failed to fetch Users.' }
    }
  }
  private async CheckIfExists() {
    try {
      const count = await User.countDocuments()
      return count > 0
    } catch (error) {
      return false
    }
  }
}
