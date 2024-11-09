<script>
import FinanceDataService from "../../services/FinanceDataService.js";

export default {
  props: {
    invoice: {
      type: Object,
      required: true,
    }
  },
  methods: {
    fetchInvoice() {
      FinanceDataService.getFactura(this.invoice.id)
          .then(response => {
            this.invoice = response.data;
          })
          .catch(error => {
            console.error('Error fetching invoice:', error);
          });
    },
    viewDetails() {
      if (this.invoice) {
        alert(`Detalles de la factura:\nNúmero: ${this.invoice.number}\nFecha: ${this.invoice.date}\nMonto: ${this.invoice.amount}\nEstado: ${this.invoice.status}`);
      }
    }
  },
  mounted() {
    if (this.invoice) {
      this.fetchInvoice();
    }
  }
};
</script>

<template>
  <pv-card v-if="invoice">
    <div class="invoice-item">
      <div class="invoice-header">
        <h3>{{ invoice.number }}</h3>
        <p>{{ invoice.date }}</p>
      </div>
      <div class="invoice-details">
        <p>Monto: {{ invoice.amount }}</p>
        <p>Estado: {{ invoice.status }}</p>
      </div>
      <pv-button label="Ver detalles" icon="pi pi-search" @click="viewDetails"/>
    </div>
  </pv-card>
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