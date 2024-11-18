<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService.js';

const route = useRoute();
const invoiceDetails = ref();
// Intentar obtener datos del estado del router
const loading = ref(true);

// Función para realizar una llamada a la API si no hay datos
const fetchInvoiceDetails = () => {
  const id = route.params.documentoId;
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
  <div class="card" v-if="!loading">
    <h2 class="card-title">Detalle de Factura</h2>

    <!-- Componente de carga -->
    <ProgressSpinner v-if="loading" style="display: block; margin: 20px auto;" />

    <!-- Detalle de la factura -->
    <template v-else-if="invoiceDetails">
      <DataTable :value="[invoiceDetails]" class="p-datatable-striped">
        <Column field="fechaEmision" header="Fecha de Emisión"></Column>
        <Column field="fechaPago" header="Fecha de Pago"></Column>
        <Column field="totalFacturado" header="Total Facturado"></Column>
        <Column field="retencion" header="Retención"></Column>
      </DataTable>
    </template>

    <!-- Mensaje cuando no se encuentran datos -->
    <template v-else>
      <p>No se encontraron datos de la factura.</p>
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
