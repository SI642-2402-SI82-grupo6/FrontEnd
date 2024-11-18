<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService.js';

const route = useRoute();
const invoiceDetails = ref(route.state?.data || null);
console.log('Datos del documento:', route.state?.data );
// Intentar obtener datos del estado del router
const loading = ref(true);

// Función para realizar una llamada a la API si no hay datos
const fetchInvoiceDetails = () => {
  const id = route.params.id; // Obtener el ID de los parámetros de la URL
  FinanceDataService.getFactura(id)
      .then(response => {
        invoiceDetails.value = response.data;
        loading.value = false;
      })
      .catch(error => {
        console.error('Error fetching invoice details:', error);
        loading.value = false;
      });
};

// Comprobación: si no hay datos, realizar la llamada a la API
onMounted(() => {
  if (!invoiceDetails.value) {
    fetchInvoiceDetails();
  } else {
    loading.value = false; // Si ya hay datos, no mostrar "Cargando..."
  }
});
</script>

<template>
  <div>
    <h2>Detalle de Factura</h2>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="invoiceDetails">
      <p><strong>ID:</strong> {{ invoiceDetails.id }}</p>
      <p><strong>Fecha de Emisión:</strong> {{ invoiceDetails.fechaEmision }}</p>
      <p><strong>Fecha de Pago:</strong> {{ invoiceDetails.fechaPago }}</p>
      <p><strong>Total Facturado:</strong> {{ invoiceDetails.totalFacturado }}</p>
      <p><strong>Retención:</strong> {{ invoiceDetails.retencion }}</p>
    </div>
    <div v-else>
      <p>No se encontraron datos de la factura.</p>
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
