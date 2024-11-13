<script setup>
import { ref, onMounted } from 'vue';
import FinanceDataService from "../../services/FinanceDataService.js";
import InvoiceItem from "./InvoiceItem.vue";

const invoices = ref([]);
const fetchInvoices = () => {
  FinanceDataService.getAllFacturas()
      .then(response => {
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
      <ProgressSpinner />
    </div>
  </div>

</template>

<style scoped>

</style>