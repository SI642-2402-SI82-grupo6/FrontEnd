import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/user/Login.vue';
import Register from '../views/user/Register.vue';
import Home from "../views/home/Home.vue";
import LetterList from "../components/letter/LetterList.vue";
import About from "../views/home/About.vue";
import Contact from "../views/home/Contact.vue";
import Services from "../views/home/Services.vue";
import InvoiceDetails from "../components/invoice/InvoiceDetail.vue";
import WalletList from '../components/wallet/WalletList.vue';
import WalletResult from '../components/wallet/WalletResult.vue';
import WalletView from "../views/document/WalletView.vue";
import InvoiceView from "../views/document/InvoiceView.vue";
import LetterView from "../views/document/LetterView.vue";
import InvoiceList from "../components/invoice/InvoiceList.vue";
import NotFound from '../views/NotFound.vue';
import LetterDetail from "../components/letter/LetterDetail.vue";
import InvoiceDetail from "../components/invoice/InvoiceDetail.vue"; // Ensure this import

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
    path: '/invoice-information',
    name: 'InvoiceInformation',
    component: InvoiceView,
    meta: { requiresAuth: true }
  },
  {
    path: '/letter-information',
    name: 'LetterInformation',
    component: LetterView,
    meta: { requiresAuth: true }
  },
  {
    path: '/letters',
    name: 'LetterList',
    component: LetterList,
    meta: { requiresAuth: true }
  },
  {
    path: '/invoices',
    name: 'InvoiceList',
    component: InvoiceList,
    meta: { requiresAuth: true }
  },
  {
    path: '/wallet',
    name: 'WalletView',
    component: WalletView,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
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
    path: '/about',
    name: 'about',
    component: About,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    meta: { requiresAuth: true }
  },
  {
    path: '/services',
    name: 'services',
    component: Services,
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice/:id',
    name: 'InvoiceDetails',
    component: InvoiceDetails,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/wallet-list',
    name: 'WalletList',
    component: WalletList,
    meta: { requiresAuth: true }
  },
  {
    path: '/wallet-result/:id',
    name: 'WalletResult',
    component: WalletResult,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/letter-detail/:documentoId',
    name: 'LetterDetail',
    component: LetterDetail, // Asegúrate de que este componente esté importado correctamente
    meta: { requiresAuth: true },
  },
  {
    path: '/invoice-detail/:documentoId',
    name: 'InvoiceDetail',
    component: InvoiceDetail, // Asegúrate de que este componente esté importado correctamente
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.name);

  // Check if the URL is /wallet? and redirect to /wallet
  if (to.path === '/wallet?' || to.fullPath === '/wallet?') {
    next({ path: '/wallet' });
    return;
  }

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