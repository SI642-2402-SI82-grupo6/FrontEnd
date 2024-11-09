<template>
  <div v-if="invoice">
    <h1>Detalles de la Factura</h1>
    <p><strong>Número:</strong> {{ invoice.number }}</p>
    <p><strong>Fecha:</strong> {{ invoice.date }}</p>
    <p><strong>Monto:</strong> {{ invoice.amount }}</p>
    <p><strong>Estado:</strong> {{ invoice.status }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import FinanceDataService from '../../services/FinanceDataService.js';
import { useRoute } from 'vue-router';

export default {
  name: 'InvoiceDetails',
  setup() {
    const route = useRoute();
    const invoice = ref(null);

    onMounted(async () => {
      const id = route.params.id;
      try {
        const response = await FinanceDataService.getFactura(id);
        invoice.value = response.data;
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    });

    return {
      invoice
    };
  }
};
</script>

<style scoped>

</style>