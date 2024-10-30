<template>

    <router-view/>

</template>

<style scoped>
html, body {
  height: 100%; /* Asegúrate de que el body ocupe el 100% */
  margin: 0; /* Elimina el margen por defecto */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh; /* Ocupa toda la altura de la ventana */


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
