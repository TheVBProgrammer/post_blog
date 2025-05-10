/**
 * @description This is a customized with static method and to be available anywhere in the codd
 */
export default class UserHelper {
    static isLogin(){
        // extract the saved token from a browser
        const token = sessionStorage.getItem('token')
        // including user details
        const user = sessionStorage.getItem('auth_user')
        // return true if it has token and user credentials else false
        return !!token && !!user
    }

    /**
     * This is the currently logged user account objects
     */
    static authenticatedUser() {
        // including user details, using sessionStorage
        const user = sessionStorage.getItem('auth_user')
        // convert array to a String JSON Object
        return user ? JSON.parse(user) : null
    }
}