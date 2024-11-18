<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService.js';

const route = useRoute();
const letterDetails = ref();
const loading = ref(true);

// Función para realizar una llamada a la API si no hay datos
const fetchLetterDetails = () => {
  const id = route.params.documentoId; // Obtener el ID de los parámetros de la URL
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
  <div class="card" v-if="!loading">
    <h2 class="card-title">Detalle de Letra</h2>
    <ProgressSpinner v-if="loading" style="display: block; margin: 20px auto;" />

    <template v-else-if="letterDetails">
      <DataTable :value="letterDetails" class="p-datatable-striped">
        <Column field="fechaGiro" header="Fecha de Giro"></Column>
        <Column field="fechaVencimiento" header="Fecha de Vencimiento"></Column>
        <Column field="valorNominal" header="Valor Nominal"></Column>
        <Column field="retencion" header="Retención"></Column>
      </DataTable>
    </template>
    <template v-else>
      <p>No se encontraron datos de la letra.</p>
    </template>
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
