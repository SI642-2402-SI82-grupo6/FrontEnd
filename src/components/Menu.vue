<template>
  <div class="menu-container">
    <h2>Menú Principal</h2>
    <div class="form-group">
      <label for="menu">Tipo de Documento</label>
      <select v-model="menuSeleccionado" @change="navigateToMenu" class="form-control" id="menu">
        <option v-for="menu in menus" :key="menu" :value="menu">{{ menu }}</option>
      </select>
      <pv-button @click.prevent="logout" class="button">Cerrar Sesión</pv-button>
    </div>
  </div>
</template>

<script>
import FinanceDataService from "../services/FinanceDataService.js";

export default {
  name: 'MainMenu',
  data() {
    return {
      menuSeleccionado: '',
      menus: ['Letra', 'Factura']
    }
  },
  methods: {
    navigateToMenu() {
      if (this.menuSeleccionado) {
        this.$router.push(`/${this.menuSeleccionado.toLowerCase()}`);
      }
    },
    logout() {
      FinanceDataService.logout().then(data => {
        alert(data.message);
        this.$router.push('/login');
      }).catch(error => {
        console.error(error);
        alert("An error occurred during logout.");
      });
    }

  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-container {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 15px;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px; /* Adjust width as needed */
}

h2 {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
  display: block;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.button {
  color: #fff;
  background-color: #086a15;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%; /* Make button full width */
}

.button:hover {
  background-color: #0056b3;
}
</style>