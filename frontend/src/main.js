import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

const app = createApp(App);
app.use(router); // Attach the router
app.mount('#app');