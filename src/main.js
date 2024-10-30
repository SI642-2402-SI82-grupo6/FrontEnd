import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Add PrimeVue
import PrimeVue from "primevue/config";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

// Add PrimeFlex
import 'primeflex/primeflex.css';
import './style.css';



// App Theme
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


import 'primevue/inputgroup';
import 'primevue/inputgroupaddon';

const app = createApp(App);

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') {
        document.body.classList.add('auth-background');
    } else {
        document.body.classList.remove('auth-background');
    }
    next();
});


app.use(PrimeVue)
    .use(router)
    .mount('#app');