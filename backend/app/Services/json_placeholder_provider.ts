import axios from 'axios'
import dotenv from 'dotenv'
// allow to use process.env
dotenv.config()
// get the resource JSONPlaceholder url from .env file
const resource = process.env.RESOURCE_URL
/**
 * @Description AdonisJS Class created by: Eng'r Nolan F. Sunico
 */
export default class JsonPlaceholderProvider {
  /**
   * @description Query JSONPlaceholder and check against mongoDB User model
   * @param email
   */
  public static async findByEmail(email: String) {
    // fetch all users from JSONPlaceholder Website
    const result = await axios.get(resource + '/users')
    // Extract the user data only
    const users = result.data
    // query the users data by email and return the result
    return users.find((user: any) => user.email === email)
  }

  /**
   * @description Query JSONPlaceholder User by UserId
   * @param Id
   */
  public static async findById(Id: Number) {
    // fetch all users from JSONPlaceholder Website
    const result = await axios.get(resource + '/users/' + Id)
    // Extract the user data only
    return result.data
  }

  /**
   * @description Query JSONPlaceholder POST by UserId
   * @param Id
   */
  public static async findPostByUserId(Id: Number) {
    // return the posts
    return await axios.get(resource + '/posts', {
      params: { userId: Id },
    })
  }

  /**
   * @description Query JSONPlaceholder POST by postId
   * @param postId
   */
  public static async findPostByPostId(postId: Number) {
    return await axios.get(resource + '/posts', {
      params: { id: postId },
    })
  }
}
