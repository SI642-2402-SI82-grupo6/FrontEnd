<template>
  <Card title="Letter Information">
    <template #content>
      <h3>Información de la Letra</h3>
      <div class="card flex justify-center">
        <Form @submit.prevent="submitLetter">
          <div class="p-grid p-fluid">

            <!-- Fecha Giro -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="fechaGiro">
                Fecha Giro <i class="pi pi-calendar"> :</i>
              </label>
              <Calendar id="fechaGiro" v-model="letter.fechaGiro" required class="input-same-width"/>
            </div>

            <!-- Fecha Vencimiento -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="fechaVencimiento">
                Fecha Vencimiento <i class="pi pi-calendar"> :</i>
              </label>
              <Calendar id="fechaVencimiento" v-model="letter.fechaVencimiento" required class="input-same-width"/>
            </div>

            <!-- Valor Nominal -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="valorNominal">
                Valor Nominal <i class="pi pi-dollar"> :</i>
              </label>
              <InputNumber
                  id="valorNominal"
                  v-model="letter.valorNominal"
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  required
                  class="input-same-width"
              />
            </div>

            <!-- Retención -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="retencion">
                Retención <i class="pi pi-arrow-right-arrow-left"> :</i>
              </label>
              <InputNumber
                  id="retencion"
                  v-model="letter.retencion"
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  required
                  class="input-same-width"
              />
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
  name: 'LetterInformation',
  data() {
    return {
      letter: {
        fechaGiro: '',
        fechaVencimiento: '',
        valorNominal: 0,
        retencion: 0
      }
    }
  },
  methods: {
    async submitLetter() {
      try {
        const formattedLetter = {
          ...this.letter,
          fechaGiro: moment(this.letter.fechaGiro).format('YYYY-MM-DD'),
          fechaVencimiento: moment(this.letter.fechaVencimiento).format('YYYY-MM-DD')
        };
        const response = await FinanceDataService.createLetra(formattedLetter);
        console.log('Letter created:', response.data);
      } catch (error) {
        console.error('Error creating letter:', error);
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
  gap: 5px;
}

.p-field {
  margin-bottom: 5px;
}
</style>