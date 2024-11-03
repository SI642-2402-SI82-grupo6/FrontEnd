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
      },
      tipoTasaOptions: ['EFECTIVA', 'NOMINAL'],

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
  <Card>

    <template #content>
      <h3>Informacion de Tasa y Plazo</h3>
      <form @submit.prevent="submitRateAndTerm">
        <div class="p-field">
          <label >Tipo Tasa:</label>
          <Dropdown
              id="tipoTasa"
              v-model="rateAndTerm.tipoTasa"
              :options="tipoTasaOptions"

              placeholder="Seleccione tipo de tasa"
              required
          />
        </div>

        <div v-if="rateAndTerm.tipoTasa === 'EFECTIVA'">
          <div class="p-field">
            <label >Tasa Nominal:</label>
            <InputNumber id="tasaNominal" v-model="rateAndTerm.tasaNominal" required />
          </div>
          <div class="p-field">
            <label >Plazo de Tasa:</label>
            <InputNumber id="plazoDeTasa" v-model="rateAndTerm.plazoDeTasa" required />
          </div>
          <div class="p-field">
            <label >Periodo Capital:</label>
            <InputNumber id="periodoCapital" v-model="rateAndTerm.periodoCapital" required />
          </div>
        </div>

        <div v-if="rateAndTerm.tipoTasa === 'NOMINAL'">
          <div class="p-field">
            <label >Tasa Efectiva:</label>
            <InputNumber id="tasaEfectiva" v-model="rateAndTerm.tasaEfectiva" required />
          </div>
          <div class="p-field">
            <label >Plazo Efectivo:</label>
            <InputNumber id="plazoEfectivo" v-model="rateAndTerm.plazoEfectivo" required />
          </div>
        </div>

        <div  class="p-field">
          <label >Fecha Descuento:</label>
          <Calendar id="fechaDescuento" v-model="rateAndTerm.fechaDescuento" required />
        </div>



      </form>
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