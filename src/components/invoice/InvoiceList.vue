<script setup>
import { ref, onMounted } from 'vue';
import FinanceDataService from "../../services/FinanceDataService.js";
import InvoiceItem from "./InvoiceItem.vue";

const invoices = ref([]);
const timeoutReached = ref(false);

const fetchInvoices = () => {
  FinanceDataService.getAllFacturas()
      .then(response => {
        const timeout = setTimeout(() => {
          timeoutReached.value = true;

        }, 100);
        invoices.value = response.data;
        console.log('Invoices:', invoices.value);
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
      });
};

onMounted(fetchInvoices);
</script>

<template>
  <div>
    <div v-if="invoices.length" v-for="invoice in invoices" :key="invoice.id">
      <InvoiceItem :invoice="invoice"/>
    </div>
    <div v-else>
      <div v-if="timeoutReached">No se ha encontrado ninguna factura.</div>
      <div v-else>
        <ProgressSpinner />
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>