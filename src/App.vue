<template>
  <div id="app">
    <MainMenuVue v-if="!isLoginOrRegister" class="header" />
    <div class="main-content">
      <router-view />
    </div>
    <MainFotter v-if="!isLoginOrRegister"/>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed; /* Fija el menú en la parte superior */
  top: 0;
  left: 0;
  right: 0;
  z-index: 10; /* Asegura que esté por encima del contenido */
  background-color: #e0f7fa; /* Azul claro */

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra para un efecto elevado */
}

.main-content {
  margin-top: 80px; /* Espacio para el header fijo + separación adicional */
  padding: 20px; /* Espacio adicional alrededor del contenido */
  flex-grow: 1; /* Permite que el contenido se expanda */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #4a42b9;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainMenuVue from "./components/MainMenu.vue";
import MainFotter from "./components/MainFotter.vue";
const route = useRoute();

// Computed property para determinar si la ruta actual es de login o register
const isLoginOrRegister = computed(() => {
  return route.name === 'login' || route.name === 'register'; // Asegúrate de que los nombres de las rutas coincidan
});
</script>
