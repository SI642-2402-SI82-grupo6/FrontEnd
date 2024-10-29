import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Add PrimeVue
import PrimeVue from 'primevue/config';

// Add PrimeFlex
import 'primeflex/primeflex.css';
import './style.css';
// Add PrimeVue Components
import Card from 'primevue/card';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Sidebar from 'primevue/sidebar';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import MenuBar from 'primevue/menubar';
import Toolbar from 'primevue/toolbar';

// App Theme
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.component('pv-card', Card);
app.component('pv-button', Button);
app.component('pv-select-button', SelectButton);
app.component('pv-sidebar', Sidebar);
app.component('pv-avatar', Avatar);
app.component('pv-menu', Menu);
app.component('pv-menubar', MenuBar);
app.component('pv-toolbar', Toolbar);

app.use(router).mount('#app');