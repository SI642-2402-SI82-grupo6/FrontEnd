<script >
import MainMenu from "../../components/Menu.vue";


export default {
  name: 'HomeHome',
  components: {MainMenu}
}
</script>

<template>

  <div class="home-container">
    <div class="main-menu">
      <MainMenu/>
    </div>
    
    <div class="content">
      <h1>Home</h1>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: row;
}

.main-menu {
  position: absolute;
  top: 0;
  left: 0;
}

.content {
  margin-left: 200px;
  padding: 20px;
}
</style>