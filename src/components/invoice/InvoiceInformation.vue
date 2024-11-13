<template>
  <Card>
    <template #content>
      <h3>Invoice Information</h3>
      <div class="card flex justify-center">
        <Toast />
        <Form @submit.prevent="submitInvoice">
          <div class="p-grid p-fluid">

            <!-- Fecha Emisión -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="fechaEmision">
                Fecha Emisión <i class="pi pi-calendar"> :</i>
              </label>
              <Calendar id="fechaEmision" v-model="invoice.fechaEmision" required class="input-same-width"></Calendar>
            </div>

            <!-- Fecha Pago -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="fechaPago">
                Fecha Pago <i class="pi pi-calendar"> :</i>
              </label>
              <Calendar id="fechaPago" v-model="invoice.fechaPago" required class="input-same-width"></Calendar>
            </div>

            <!-- Total Facturado -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="totalFacturado">
                Total Facturado <i class="pi pi-dollar"> :</i>
              </label>
              <InputNumber
                  id="totalFacturado"
                  v-model="invoice.totalFacturado"
                  :invalid="invoice.totalFacturado <= 0"
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  required
                  class="input-same-width"
              ></InputNumber>
              <Message v-if="!invoice.totalFacturado" severity="error" text="El valor debe ser mayor a 0" >Debe ser mayor a 0</Message>
            </div>


            <!-- Retención -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="retencion">
                Retención <i class="pi pi-arrow-right-arrow-left"> :</i>
              </label>
              <InputNumber
                  id="retencion"
                  v-model="invoice.retencion"
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  required
                  class="input-same-width"
              ></InputNumber>
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
import moment from "moment";
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
        const formattedInvoice = {
          ...this.invoice,
          fechaEmision: moment(this.invoice.fechaEmision).format('YYYY-MM-DD'),
          fechaPago: moment(this.invoice.fechaPago).format('YYYY-MM-DD')
        };
        const response = await FinanceDataService.createFactura(formattedInvoice);
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
  gap: 4rem;
}
label {
  font-weight: bold;
  text-align: right;
}
.field-inline label {
  min-width: 200px;
  text-align: right;
}

/* Establece un ancho uniforme para Calendar y InputNumber */
.input-same-width {
  width: 100%; /* Asegura que todos ocupen el mismo ancho disponible */
  max-width: 300px; /* Puedes ajustar este valor según el diseño deseado */
}

.p-grid {
  gap: 5px; /* Ajusta este valor según el espacio deseado */
}

.p-field {
  margin-bottom: 5px; /* Ajusta este valor según el espacio deseado */
}
</style>

