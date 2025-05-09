import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Posts from '../views/Posts.vue';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
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
        path: '/logout',
        name: 'Logout',
        component: Posts
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;