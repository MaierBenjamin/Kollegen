import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})

const Login = () => import('../views/LoginView.vue')


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
  ]
export default router
