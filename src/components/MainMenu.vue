
<template>

    <Menubar :model="items"  >
      <template #start>
        <Button @click="OnClick" variant="outlined" class="button-no-background">
          <img src="/src/assets/logo.png" alt="Logo"  class="icon icon--text-size"  />
        </Button>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" class="menu-icon" />
            <span class="menu-label">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.route" :target="item.target" v-bind="props.action">
          <span :class="item.icon" class="menu-icon" />
          <span class="menu-label">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>

</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import FinanceDataService from "../services/FinanceDataService.js";

const router = useRouter();
const OnClick = () => {
  router.push('/home');
}
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/home');
    }
  },
  {
    separator: true
  },
  {
    label: 'Wallet',
    icon: 'pi pi-wallet',
    command: () => {
      router.push('/wallet');
    },

    items: [
      {
        label: 'invoices',
        icon: 'pi pi-credit-card',
        command: () => {
          router.push('/invoices');
        }
      },
      {
        label: 'letters',
        icon: 'pi pi-book',
        command: () => {
          router.push('/letters');
        }
      }
    ]
  },
  {
    label:'Servicios',
    icon: 'pi pi-cog',
    route: '/services'
  },
  {
    label:'Nosotros',
    icon: 'pi pi-info',
    route: '/about'
  },
  {
    label:'Contacto',
    icon: 'pi pi-envelope',
    route: '/contact'},
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => {
      FinanceDataService.logout();
      router.push('/login');
    }
  },

]);
</script>
<style scoped>
.menu-icon {
  margin-right: 0.1em; /* Ajusta el valor según sea necesario */
}

.menu-label {
  margin-left: 0.1em; /* Ajusta el valor según sea necesario */
}
.icon--text-size {
  width: 3em;
  height: 3em;
  vertical-align: middle;


}
.button-no-background {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
}
</style>