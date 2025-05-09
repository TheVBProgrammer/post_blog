export default class UserHelper {
    static isLogin(){
        // extract the saved token from a browser
        const token = localStorage.getItem('token')
        // including user details
        const user = localStorage.getItem('user')
        // return true if it has token and user credentials else false
        return !!token && !!user
    }
}