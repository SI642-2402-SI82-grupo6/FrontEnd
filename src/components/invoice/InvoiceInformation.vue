<Form @submit.prevent="submitInvoice">
<div class="p-grid p-fluid">

  <!-- Fecha Emisión -->
  <div class="p-field p-col-12 p-md-6 field-inline">
    <label for="fechaEmision">Fecha Emisión:</label>
    <Calendar id="fechaEmision" v-model="invoice.fechaEmision" required></Calendar>
  </div>

  <!-- Fecha Pago -->
  <div class="p-field p-col-12 p-md-6 field-inline">
    <label for="fechaPago">Fecha Pago:</label>
    <Calendar id="fechaPago" v-model="invoice.fechaPago" required></Calendar>
  </div>

  <!-- Total Facturado -->
  <div class="p-field p-col-12 p-md-6 field-inline">
    <label for="totalFacturado">Total Facturado:</label>
    <InputNumber
        id="totalFacturado"
        v-model="invoice.totalFacturado"
        mode="decimal"
        :minFractionDigits="0"
        :maxFractionDigits="4"
        required
    ></InputNumber>
  </div>

  <!-- Retención -->
  <div class="p-field p-col-12 p-md-6 field-inline">
    <label for="retencion">Retención:</label>
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
.field-inline {
  display: flex;
  align-items: center;
  gap: 1rem; /* Espacio entre el label y el input */
}

.field-inline label {
  min-width: 120px; /* Ancho mínimo para alinear los labels */
  text-align: right; /* Alineación del texto del label */
}
</style>

