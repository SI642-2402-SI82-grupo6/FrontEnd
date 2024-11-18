<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService.js';

const route = useRoute();
const letterDetails = ref(route.state?.data || null); // Intentar obtener datos del estado del router
const loading = ref(true);

// Función para realizar una llamada a la API si no hay datos
const fetchLetterDetails = () => {
  const id = route.params.id; // Obtener el ID de los parámetros de la URL
  FinanceDataService.getLetra(id)
      .then(response => {
        letterDetails.value = response.data;
        loading.value = false;
      })
      .catch(error => {
        console.error('Error fetching letter details:', error);
        loading.value = false;
      });
};

// Comprobación: si no hay datos, realizar la llamada a la API
onMounted(() => {
  if (!letterDetails.value) {
    fetchLetterDetails();
  } else {
    loading.value = false; // Si ya hay datos, no mostrar "Cargando..."
  }
});
</script>

<template>
  <div>
    <h2>Detalle de Letra</h2>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="letterDetails">
      <p><strong>ID:</strong> {{ letterDetails.id }}</p>
      <p><strong>Fecha de Giro:</strong> {{ letterDetails.fechaGiro }}</p>
      <p><strong>Fecha de Vencimiento:</strong> {{ letterDetails.fechaVencimiento }}</p>
      <p><strong>Valor Nominal:</strong> {{ letterDetails.valorNominal }}</p>
      <p><strong>Retención:</strong> {{ letterDetails.retencion }}</p>
    </div>
    <div v-else>
      <p>No se encontraron datos de la letra.</p>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
p {
  margin: 0.5rem 0;
}
</style>
