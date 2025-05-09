import axios from 'axios'
import dotenv from 'dotenv'
// allow to use process.env
dotenv.config()

export default class JsonPlaceholderProvider {
  public static async findByEmail(email: String) {
    // get the resource JSONPlaceholder url from .env file
    const resource = process.env.RESOURCE_URL
    // fetch all users from JSONPlaceholder Website
    const result = await axios.get(resource + '/users')
    // Extract the user data only
    const users = result.data
    // query the users data by email and return the result
    return users.find((user: any) => user.email === email)
  }
}
