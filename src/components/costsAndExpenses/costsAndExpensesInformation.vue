<template>
  <Card title="Gastos">
    <template #content>
      <form @submit.prevent="submitCostsAndExpenses">
        <div>
          <label for="tipoGasto" class="black-text">Tipo Gasto:</label>
          <Dropdown
              v-model="costsAndExpenses.tipoGasto"
              :options="options"
              optionLabel="label"
              placeholder="Selecciona un tipo de gasto"
              required
          />
        </div>
        <div>
          <label for="motivoGasto">Motivo Gasto:</label>
          <Dropdown
              v-model="costsAndExpenses.motivoGasto"
              :options="motivoGastoOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecciona un motivo de gasto"
          />
        </div>
        <div>
          <label class="black-text">¿Es Porcentaje?</label>
          <Checkbox
              id="esPorcentaje"
              v-model="costsAndExpenses.valorExpresado.esPorcentaje"
              :binary="true"
          />
          <label for="esPorcentaje">Es Porcentaje</label>
        </div>
        <InputGroup>
          <label for="valor">Valor:</label>
          <Button
              v-if="!costsAndExpenses.valorExpresado.esPorcentaje"
              type="button"
              @click="toggleCurrency"
              class="black-text"
          >
            Tipo de moneda
          </Button>
          <InputNumber
              id="valor"
              v-model="costsAndExpenses.valorExpresado.valor"
              mode="decimal"
              :minFractionDigits="0"
              :maxFractionDigits="4"
              :prefix="currencySymbol"
              required
          />
        </InputGroup>
        <Button type="submit" class="black-text">Enviar</Button>
      </form>
    </template>
  </Card>
</template>

<script>
import FinanceDataService from '../../services/FinanceDataService.js';

export default {
  name: 'CostsAndExpensesInformation',
  data() {
    return {
      costsAndExpenses: {
        tipoGasto: 'INICIAL',
        motivoGasto: '',
        valorExpresado: {
          esPorcentaje: false,
          valor: 0,
        },
      },
      motivoGastoOptions: [
        { label: 'Seguro', value: 'Seguro' },
        { label: 'Portes', value: 'Portes' },
        { label: 'Fotocopias', value: 'Fotocopias' },
        { label: 'Comisión de Estudio', value: 'ComisionDeEstudio' },
        { label: 'Comisión de Desembolso', value: 'ComisionDeDesembolso' },
        { label: 'Comisión de Intermediación', value: 'ComisionDeIntermediacion' },
        { label: 'Gastos de Administración', value: 'GastosDeAdministracion' },
        { label: 'Gastos Notariales', value: 'GastosNotariales' },
        { label: 'Gastos Registrales', value: 'GastosRegistrales' },
        { label: 'Otros Gastos', value: 'OtrosGastos' },
      ],
      options: [
        { label: 'INICIAL', value: 'INICIAL' },
        { label: 'FINAL', value: 'FINAL' },
      ],
      currencySymbol: '$',
    };
  },
  watch: {
    'costsAndExpenses.valorExpresado.esPorcentaje'(newValue) {
      this.currencySymbol = newValue ? '%' : '$';
    },
  },
  methods: {
    async submitCostsAndExpenses() {
      try {
        const response = await FinanceDataService.createCostesGastos(this.costsAndExpenses);
        console.log('Costs and Expenses created:', response.data);
      } catch (error) {
        console.error('Error creating Costs and Expenses:', error);
      }
    },
    toggleCurrency() {
      this.currencySymbol = this.currencySymbol === '$' ? 'S/.' : '$';
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input,
select {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.black-text {
  color: black;
}

.card {
  display: block; /* Asegúrate de que no esté oculto */
}
</style>
