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

<template>
  <Card title="Letter Information">
    <template #content>
      <h3>Información de la Letra</h3>
      <Form @submit.prevent="submitLetter" class="form-container">
        <div class="p-field field-inline">
          <label for="fechaGiro">Fecha Giro:</label>
          <Calendar id="fechaGiro" v-model="letter.fechaGiro" required class="input-same-width"/>
        </div>

        <div class="p-field field-inline">
          <label for="fechaVencimiento">Fecha Vencimiento:</label>
          <Calendar id="fechaVencimiento" v-model="letter.fechaVencimiento" required class="input-same-width"/>
        </div>

        <div class="p-field field-inline">
          <label for="valorNominal">Valor Nominal:</label>
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

        <div class="p-field field-inline">
          <label for="retencion">Retención:</label>
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
      </Form>
    </template>
  </Card>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-inline {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.field-inline label {
  min-width: 150px;
  text-align: right;
  font-weight: bold;
}

/* Clase para hacer que todos los inputs tengan el mismo ancho */
.input-same-width {
  width: 100%;
  max-width: 300px; /* Ajusta este ancho según el diseño que desees */
}

h3 {
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
}
label{
  font-weight: bold;
}
.submit-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  align-self: center;
}
</style>
