import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Posts from '../views/Posts.vue';
import ViewPost from '../views/ViewPost.vue'
import axios from "axios";

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/posts',
        name: 'Post',
        component: Posts
    },
    {
        path: '/posts/view',
        name: 'ViewPost',
        component: ViewPost
    },
    {
        path: '/logout',
        name: 'Logout',
        beforeEnter: async (to, from, next) => {
            const apiUrl = import.meta.env.VITE_API_URL + '/logout';
            const token = sessionStorage.getItem('auth_user')
            try {
                if (token) {
                    await axios.post(apiUrl, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                }
            } catch (error) {
                console.error('Logout failed on server: ', error)
            } finally {
                sessionStorage.removeItem('auth_user') // Clear client token
                next('/login') // redirect to log in page
            }
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;