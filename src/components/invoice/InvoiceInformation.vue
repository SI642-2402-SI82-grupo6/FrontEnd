<template>
  <Card>
    <template #content>
      <h3>Invoice Information</h3>
      <div class="card flex justify-center">
        <Toast />
        <Form @submit.prevent="submitInvoice">
          <div class="p-grid p-fluid">
            <!-- Fecha Emisión -->
            <div class="p-field p-col-12 p-md-6">
              <div class="p-d-flex p-ai-center">
                <label for="fechaEmision" class="p-mr-2" style="width: 120px;">Fecha Emisión:</label>
                <Calendar id="fechaEmision" v-model="invoice.fechaEmision" required></Calendar>
              </div>
            </div>

            <!-- Fecha Pago -->
            <div class="p-field p-col-12 p-md-6">
              <div class="p-d-flex p-ai-center">
                <label for="fechaPago" class="p-mr-2" style="width: 120px;">Fecha Pago:</label>
                <Calendar id="fechaPago" v-model="invoice.fechaPago" required></Calendar>
              </div>
            </div>

            <!-- Total Facturado -->
            <div class="p-field p-col-12 p-md-6">
              <div class="p-d-flex p-ai-center">
                <label for="totalFacturado" class="p-mr-2" style="width: 120px;">Total Facturado:</label>
                <InputNumber
                    id="totalFacturado"
                    v-model="invoice.totalFacturado"
                    mode="decimal"
                    :minFractionDigits="0"
                    :maxFractionDigits="4"
                    required
                ></InputNumber>
              </div>
            </div>

            <!-- Retención -->
            <div class="p-field p-col-12 p-md-6">
              <div class="p-d-flex p-ai-center">
                <label for="retencion" class="p-mr-2" style="width: 120px;">Retención:</label>
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
          </div>
        </Form>
      </div>
    </template>
  </Card>
</template>

<script>
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

<style scoped>


label {
  font-weight: bold;
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
