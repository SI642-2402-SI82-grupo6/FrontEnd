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
  <Card>

    <template #content>
      <h3>Invoice Information</h3>
      <Form @submit.prevent="submitInvoice">
        <div class="p-field">
          <label for="fechaEmision">Fecha Emision:</label>
          <Calendar  id="fechaEmision" v-model="invoice.fechaEmision" required></Calendar >
        </div>
        <div class="p-field">
          <label for="fechaPago">Fecha Pago:</label>
          <Calendar  id="fechaPago" v-model="invoice.fechaPago" required></Calendar >
        </div>
        <div class="p-field">
          <label for="totalFacturado">Total Facturado:</label>
          <InputNumber  id="totalFacturado" v-model="invoice.totalFacturado" mode="decimal"               :minFractionDigits="0"
                        :maxFractionDigits="4" required></InputNumber>
        </div>
        <div class="p-field">
          <label for="retencion">Retencion:</label>
          <InputNumber  id="retencion" v-model="invoice.retencion" mode="decimal"               :minFractionDigits="0"
                        :maxFractionDigits="4" required></InputNumber>
        </div>

      </Form>
    </template>
  </Card>
</template>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
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

h3 {
  text-align: center;
  width: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>