<script>
import InvoiceItem from "../../components/invoice/InvoiceItem.vue";

export default {
  name: 'DocumentInvoice',
  components: {
    InvoiceItem
  },
  data() {
    return {
      invoice: {
        number: 'INV-001',
        date: '2023-10-01',
        amount: 1000,
        status: 'Paid'
      }
    };
  }
};
</script>

<template>
  <div>
    <InvoiceItem :invoice="invoice" :invoice-id="0"/>
  </div>
</template>

<style>

</style>