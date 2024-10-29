<script>
import { reactive } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      letters: [], // Cambiado a un array para manejar múltiples datos
      showDetails: reactive({}) // Objeto reactivo para controlar la visibilidad de los detalles por cada letra
    };
  },
  created() {
    console.log("LetterItem componente montado"); // Mensaje de depuración
    this.fetchLetterData();
  },
  methods: {
    async fetchLetterData() {
      try {
        console.log("Intentando obtener datos de la API..."); // Mensaje de depuración
        const response = await axios.get("http://localhost:3000/letter");
        this.letters = response.data;
        console.log("Datos obtenidos:", this.letters); // Muestra los datos obtenidos
      } catch (error) {
        console.error("Error fetching letter data:", error);
      }
    },
    viewDetails(index) {
      this.showDetails[index] = !this.showDetails[index]; // Alternar la visibilidad de los detalles
    }
  }
};
</script>

<template>
  <div class="letter-item-container">
    <div v-for="(letter, index) in letters" :key="index" class="letter-card">
      <div class="letter-header">
        <h3>{{ letter.number }}</h3>
        <p>{{ letter.date }}</p>
      </div>
      <transition name="fade">
        <div class="letter-details" v-if="showDetails[index]">
          <p>Monto: {{ letter.amount }}</p>
          <p>Estado: {{ letter.status }}</p>
        </div>
      </transition>
      <button @click="viewDetails(index)" class="pv-button details-button">
        {{ showDetails[index] ? 'Ocultar detalles' : 'Ver detalles' }}
      </button>
    </div>
    <div v-if="letters.length === 0">
      <p>Cargando...</p>
    </div>
  </div>
</template>

<style>
.letter-item-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.letter-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.letter-header {
  display: flex;
  justify-content: space-between;
}

.details-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.details-button:hover {
  background-color: #0056b3;
}
</style>