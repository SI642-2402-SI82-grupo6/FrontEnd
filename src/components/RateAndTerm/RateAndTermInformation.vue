<script>
import FinanceDataService from '../../services/FinanceDataService.js';
import moment from 'moment';
import { reactive } from 'vue';

export default {
  name: 'RateAndTermInformation',
  data() {
    return {
      rateAndTerm: {
        tipoTasa: 'EFECTIVA',
        tasaNominal: 0,
        plazoDeTasa: 0,
        plazoDeTasaOption: '', // Opcional para manejo de selección en el frontend
        periodoCapital: 0,
        fechaDescuento: '',
        tasaEfectiva: 0,
        plazoEfectivo: 0,
      },
      tipoTasaOptions: ['EFECTIVA', 'NOMINAL'],
      plazoDeTasaOptions: ['Anual', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Diario', 'Especial'],
      symbol: '%'
    }
  },
  methods: {
    async submitRateAndTerm() {
      try {
        // Excluir `plazoDeTasaOption` y transformar valores
        const { plazoDeTasaOption, ...dataToSend } = this.rateAndTerm;

        // Ajustar valores numéricos y formatos antes de enviar
        if (dataToSend.tipoTasa === 'NOMINAL') {
          dataToSend.tasaNominal = dataToSend.tasaNominal / 100; // Convertir de porcentaje a decimal
        } else if (dataToSend.tipoTasa === 'EFECTIVA') {
          dataToSend.tasaEfectiva = dataToSend.tasaEfectiva / 100; // Convertir de porcentaje a decimal
        }

        dataToSend.fechaDescuento = moment(dataToSend.fechaDescuento).format('YYYY-MM-DD'); // Formato de fecha

        // Log para ver los datos que se enviarán al backend
        console.log('Enviando datos:', JSON.stringify(dataToSend, null, 2));

        // Envío de datos al servicio
        const response = await FinanceDataService.createTasaYPlazo(dataToSend);
        console.log('Tasa y Plazo creados:', response.data);
      } catch (error) {
        // Manejador de errores mejorado
        console.error('Error al crear Tasa y Plazo:', error.response ? error.response.data : error.message);
      }
    }
  }
}
</script>

<template>
  <Card>
    <template #content>
      <h3>Información de Tasa y Plazo</h3>
      <Form @submit.prevent="submitRateAndTerm">
        <!-- Tipo de Tasa -->
        <div class="p-field">
          <label>Tipo Tasa:</label>
          <Dropdown
              id="tipoTasa"
              v-model="rateAndTerm.tipoTasa"
              :options="tipoTasaOptions"
              placeholder="Seleccione tipo de tasa"
              required
          />
        </div>

        <!-- Sección para Tasa Nominal -->
        <div v-if="rateAndTerm.tipoTasa === 'NOMINAL'">
          <div class="p-field">
            <label>Tasa Nominal:</label>
            <InputNumber
                mode="decimal"
                :minFractionDigits="0"
                :maxFractionDigits="4"
                id="tasaNominal"
                :prefix="symbol"
                v-model="rateAndTerm.tasaNominal"
                required
            />
          </div>
          <div class="p-field">
            <label>Plazo de Tasa:</label>
            <Dropdown
                id="plazoDeTasaOption"
                v-model="rateAndTerm.plazoDeTasaOption"
                :options="plazoDeTasaOptions"
                placeholder="Seleccione plazo de tasa"
                required
            />
            <InputNumber
                v-if="rateAndTerm.plazoDeTasaOption === 'Especial'"
                mode="decimal"
                :minFractionDigits="0"
                :maxFractionDigits="4"
                id="plazoDeTasa"
                v-model="rateAndTerm.plazoDeTasa"
                required
            />
          </div>
          <div class="p-field">
            <label>Periodo Capital:</label>
            <InputNumber
                mode="decimal"
                :minFractionDigits="0"
                :maxFractionDigits="4"
                id="periodoCapital"
                v-model="rateAndTerm.periodoCapital"
                required
            />
          </div>
        </div>

        <!-- Sección para Tasa Efectiva -->
        <div v-if="rateAndTerm.tipoTasa === 'EFECTIVA'">
          <div class="p-field">
            <label>Tasa Efectiva:</label>
            <InputNumber
                mode="decimal"
                :minFractionDigits="0"
                :maxFractionDigits="4"
                id="tasaEfectiva"
                v-model="rateAndTerm.tasaEfectiva"
                required
            />
          </div>
          <div class="p-field">
            <label>Plazo Efectivo:</label>
            <InputNumber
                mode="decimal"
                :minFractionDigits="0"
                :maxFractionDigits="4"
                id="plazoEfectivo"
                v-model="rateAndTerm.plazoEfectivo"
                required
            />
          </div>
        </div>

        <!-- Fecha de Descuento -->
        <div class="p-field">
          <label>Fecha Descuento:</label>
          <Calendar id="fechaDescuento" v-model="rateAndTerm.fechaDescuento" required/>
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
  height: 100%;
}

label {
  font-weight: bold;
}

input, select {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

h3 {
  text-align: center;
  width: 100%;
}
</style>
