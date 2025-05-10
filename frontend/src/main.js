import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import axios from 'axios'

// Set the default base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL
// Attach token to every request if available
axios.interceptors.request.use((config) => {
    // get the save token from sessionStorage
    const token = sessionStorage.getItem('token')
    if (token) {
        // Assign the token to headers
        config.headers.Authorization = `Bearer ${token}`
    }
    // return config
    return config
}, (error) => {
    // return the Error to calling function
    return Promise.reject(error)
})
const app = createApp(App);
app.use(router); // Attach the router
app.mount('#app');