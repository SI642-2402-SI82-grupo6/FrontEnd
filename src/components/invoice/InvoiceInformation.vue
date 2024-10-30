<script >
import FinanceDataService from '../../services/FinanceDataService.js';

export default {
  name: 'InvoiceInformation',
  data() {
    return {
      invoice: {
        fechaEmision: '',
        fechaPago: '',
        totalFacturado: 0,
        retencion: 0
      }
    }
  },
  methods: {
    async submitInvoice() {
      try {
        const response = await FinanceDataService.createFactura(this.invoice);
        console.log('Invoice created:', response.data);
      } catch (error) {
        console.error('Error creating invoice:', error);
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitInvoice">
    <div>
      <label for="fechaEmision">Fecha Emision:</label>
      <input type="date" id="fechaEmision" v-model="invoice.fechaEmision" required>
    </div>
    <div>
      <label for="fechaPago">Fecha Pago:</label>
      <input type="date" id="fechaPago" v-model="invoice.fechaPago" required>
    </div>
    <div>
      <label for="totalFacturado">Total Facturado:</label>
      <input type="number" id="totalFacturado" v-model="invoice.totalFacturado" required>
    </div>
    <div>
      <label for="retencion">Retencion:</label>
      <input type="number" id="retencion" v-model="invoice.retencion" required>
    </div>

  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>