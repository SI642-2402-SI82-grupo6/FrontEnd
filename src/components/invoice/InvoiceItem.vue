<script setup>
import FinanceDataService from "../../services/FinanceDataService.js";
import { defineProps } from 'vue';

const props = defineProps({
  invoice: {
    type: Object,
    required: true
  }
});

const deleteInvoice = (id) => {
  FinanceDataService.deleteFactura(id)
      .then(() => {
        console.log('Invoice deleted:', id);
      })
      .catch(error => {
        console.error('Error deleting invoice:', error);
      });
};
</script>

<template>
  <DataTable :value="[invoice]" responsiveLayout="scroll">
    <Column field="fechaEmision" header="Fecha de Emisión" ></Column>
    <Column field="fechaPago" header="Fecha de Pago" ></Column>
    <Column field="totalFacturado" header="Total Facturado"></Column>
    <Column field="retencion" header="Retención"></Column>
    <Column header="Actions">
      <template #body="slotProps">
        <Button @click="deleteInvoice(invoice.id)" label="Delete"/>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
.invoice-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
}
</style>