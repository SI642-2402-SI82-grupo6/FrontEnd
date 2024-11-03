
<template>

    <Menubar :model="items" >
      <template #start>
        <Button @click="OnClick" variant="outlined" class="button-no-background">
          <img src="/src/assets/logo.png" alt="Logo"  class="icon icon--text-size"  />
        </Button>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.route" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
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
    label: 'Documentos',
    icon: 'pi pi-wallet',
    items: [
      {
        label: 'Letra',
        route: '/letra'
      },
      {
        label: 'Factura',
        route: '/factura'
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
.menubar {
  background-color: #f0f0f0; /* Cambia aquí el color de fondo */
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