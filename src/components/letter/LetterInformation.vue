<script>
import FinanceDataService from '../../services/FinanceDataService.js';

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
        const response = await FinanceDataService.createLetra(this.letter);
        console.log('Letter created:', response.data);
      } catch (error) {
        console.error('Error creating letter:', error);
      }
    }
  }
}
</script>

<template>
  <Card title="letterInformation">

    <template #content>
      <h3>Informacion Letra</h3>
    <form @submit.prevent="submitLetter">
      <div class="p-field">
        <p class="m-0">Fecha Giro:</p>
        <Calendar id="fechaGiro" v-model="letter.fechaGiro" required />
      </div>
      <div class="p-field">
        <p class="m-0" >Fecha Vencimiento:</p>
        <Calendar id="fechaVencimiento" v-model="letter.fechaVencimiento" required />
      </div>
      <div class="p-field">
        <p class="m-0">Valor Nominal:</p>
        <InputNumber  id="valorNominal" v-model="letter.valorNominal" mode="decimal"               :minFractionDigits="0"
                      :maxFractionDigits="4" required />
      </div>
      <div class="p-field">
        <p class="m-0">Retencion:</p>
        <InputNumber id="retencion" v-model="letter.retencion" mode="decimal"               :minFractionDigits="0"
                     :maxFractionDigits="4" required />
      </div>

    </form>
    </template>
  </Card>
</template>

<style scoped>
form {


  gap: 1rem;
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
</style>