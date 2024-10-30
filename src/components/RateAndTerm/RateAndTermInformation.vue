<script>
import FinanceDataService from '../../services/FinanceDataService.js';

export default {
  name: 'RateAndTermInformation',
  data() {
    return {
      rateAndTerm: {
        tipoTasa: 'EFECTIVA',
        tasaNominal: 0,
        plazoDeTasa: 0,
        periodoCapital: 0,
        fechaDescuento: '',
        tasaEfectiva: 0,
        plazoEfectivo: 0
      }
    }
  },
  methods: {
    async submitRateAndTerm() {
      try {
        const response = await FinanceDataService.createTasaYPlazo(this.rateAndTerm);
        console.log('Rate and Term created:', response.data);
      } catch (error) {
        console.error('Error creating Rate and Term:', error);
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitRateAndTerm">
    <div>
      <label for="tipoTasa">Tipo Tasa:</label>
      <select id="tipoTasa" v-model="rateAndTerm.tipoTasa" required>
        <option value="NOMINAL">NOMINAL</option>
        <option value="EFECTIVA">EFECTIVA</option>
      </select>
    </div>
    <div v-if="rateAndTerm.tipoTasa === 'NOMINAL'">
      <div>
        <label for="tasaNominal">Tasa Nominal:</label>
        <input type="number" id="tasaNominal" v-model="rateAndTerm.tasaNominal" required>
      </div>
      <div>
        <label for="plazoDeTasa">Plazo de Tasa:</label>
        <input type="number" id="plazoDeTasa" v-model="rateAndTerm.plazoDeTasa" required>
      </div>
      <div>
        <label for="periodoCapital">Periodo Capital:</label>
        <input type="number" id="periodoCapital" v-model="rateAndTerm.periodoCapital" required>
      </div>
    </div>
    <div v-else>
      <div>
        <label for="tasaEfectiva">Tasa Efectiva:</label>
        <input type="number" id="tasaEfectiva" v-model="rateAndTerm.tasaEfectiva" required>
      </div>
      <div>
        <label for="plazoEfectivo">Plazo Efectivo:</label>
        <input type="number" id="plazoEfectivo" v-model="rateAndTerm.plazoEfectivo" required>
      </div>
    </div>
    <div>
      <label for="fechaDescuento">Fecha Descuento:</label>
      <input type="date" id="fechaDescuento" v-model="rateAndTerm.fechaDescuento" required>
    </div>

  </form>
</template>

<style >
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
</style>