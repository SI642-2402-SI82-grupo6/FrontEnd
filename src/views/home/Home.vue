<template>
  <div class="home-container">
    <div class="main-menu">
      <MainMenuVue />
    </div>
    <div class="content">
      <Card class="welcome-card">
        <template #header>
          <div class="welcome-header">
            <i class="pi pi-home" style="font-size: 2em; color: #4CAF50;"></i>
            <h1>Bienvenidos a PYME Wadle</h1>
          </div>
        </template>
        <template #content>
          <p>
            En PYME Wadle, nos especializamos en ayudarte a tener más control sobre tus tasas, letras y facturas. Simplificamos la gestión financiera para que puedas tomar decisiones informadas y eficientes para tu negocio.
          </p>
          <Button label="Explorar servicios" icon="pi pi-search" class="explore-button" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import MainMenuVue from "../../components/MainMenu.vue";

export default {
  name: 'HomeHome',
  components: {
    MainMenuVue
  }
}
</script>

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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.welcome-card {
  max-width: 600px;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  color: #4CAF50;
}

.explore-button {
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
}
</style>
