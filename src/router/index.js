import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/user/Login.vue';
import Register from '../views/user/Register.vue';
import Home from "../views/home/Home.vue";
import InvoiceView from "../views/document/InvoiceView.vue";
import LetterView from "../views/document/LetterView.vue";

function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('User:', user); // Verify the user
  return user && localStorage.getItem('authToken'); // Check if the user has a valid token
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
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/factura',
    name: 'invoice',
    component: InvoiceView,
    meta: { requiresAuth: true }
  },
  {
    path: '/letra',
    name: 'letter',
    component: LetterView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.name);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('Requires authentication');
    if (!isAuthenticated()) {
      console.log('Not authenticated, redirecting to login');
      next({ name: 'login' });
    } else {
      console.log('Authenticated, proceeding');
      next();
    }
  } else {
    next();
  }
});


export default router;