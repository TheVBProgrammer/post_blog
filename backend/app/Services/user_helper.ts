import User from '#models/user'

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
}
