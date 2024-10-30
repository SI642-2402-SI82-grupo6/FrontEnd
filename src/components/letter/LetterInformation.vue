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
  <form @submit.prevent="submitLetter">
    <div>
      <label for="fechaGiro">Fecha Giro:</label>
      <input type="date" id="fechaGiro" v-model="letter.fechaGiro" required>
    </div>
    <div>
      <label for="fechaVencimiento">Fecha Vencimiento:</label>
      <input type="date" id="fechaVencimiento" v-model="letter.fechaVencimiento" required>
    </div>
    <div>
      <label for="valorNominal">Valor Nominal:</label>
      <input type="number" id="valorNominal" v-model="letter.valorNominal" required>
    </div>
    <div>
      <label for="retencion">Retencion:</label>
      <input type="number" id="retencion" v-model="letter.retencion" required>
    </div>

  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
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
</style>