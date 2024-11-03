<script >
import MainMenuVue from "../../components/MainMenu.vue";

export default {
  name: 'HomeHome',
  components: {
    MainMenuVue
  },

}
</script>

<template>


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