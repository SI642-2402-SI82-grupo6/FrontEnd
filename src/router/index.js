import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import Home from "../views/home/Home.vue";

import InvoiceView from "../views/document/InvoiceView.vue";
import LetterView from "../views/document/LetterView.vue";

function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.roles.includes('ROLE_ADMIN');
}
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
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/factura',
    name: 'invoice',
    component: InvoiceView
  },
  {
    path: '/letra',
    name: 'letter',
    component: LetterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' });
      next();
    }
  } else {
    next();
  }
});
export default router