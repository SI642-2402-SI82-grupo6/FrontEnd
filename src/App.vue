<template>

      <MainMenuVue v-if="!isLoginOrRegister" class="header" />

    <router-view class="contenido" />




      <MainFotter v-if="!isLoginOrRegister" class="footer" />

</template>

<style scoped>
html, body {
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */


}


.header {
  flex-shrink: 0; /* Prevent the header from shrinking */
  z-index: 10; /* Ensure it's above content */
  background-color: #e0f7fa; /* Light blue */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Shadow for elevated effect */
}

.contenido {
  flex: 1; /* Allow content to grow and fill remaining space */
  height: auto;
  overflow: auto; /* Ensure scrolling if content is too large */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.footer {
  flex-shrink: 0; /* Prevent the footer from shrinking */
  background-color: #e0f7fa; /* Light blue */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Shadow for elevated effect */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainMenuVue from "./components/MainMenu.vue";
import MainFotter from "./components/MainFotter.vue";

const route = useRoute();

// Computed property to determine if the current route is login or register
const isLoginOrRegister = computed(() => {
  return route.name === 'login' || route.name === 'register'; // Ensure the route names match
});
</script>
