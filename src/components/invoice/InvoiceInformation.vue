<script >
import FinanceDataService from '../../services/FinanceDataService.js';
import { reactive } from 'vue';
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
      <div class="card flex justify-center">
        <Toast />

        <Form @submit.prevent="submitInvoice">
          <div class="p-grid p-fluid">
            <label for="fechaEmision">Fecha Emisión:</label>
            <div class="p-field p-col-12 p-md-6">

              <Calendar id="fechaEmision" v-model="invoice.fechaEmision" required></Calendar>
            </div>
            <label for="fechaPago">Fecha Pago:</label>
            <div class="p-field p-col-12 p-md-6">

              <Calendar id="fechaPago" v-model="invoice.fechaPago" required></Calendar>
            </div>
            <label for="totalFacturado">Total Facturado:</label>
            <div class="p-field p-col-12 p-md-6">

              <InputNumber
                  id="totalFacturado"
                  v-model="invoice.totalFacturado"
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  required
              ></InputNumber>
            </div>
            <label for="retencion">Retención:</label>
            <div class="p-field p-col-12 p-md-6">

              <InputNumber
                  id="retencion"
                  v-model="invoice.retencion"
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  required
              ></InputNumber>
            </div>
          </div>
        </Form>

      </div>
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