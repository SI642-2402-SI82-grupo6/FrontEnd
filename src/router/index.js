import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/user/Login.vue'

import Register from '../views/user/Register.vue'
import Home from "../views/home/Home.vue";
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router