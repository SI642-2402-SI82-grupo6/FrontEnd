<template>
  <Card title="Gastos">
    <template #content>
      <h3>Agregar Gastos</h3>
      <form @submit.prevent="storeCostsAndExpenses">
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
        </div>
        <div>
          <label>Valor:</label>
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
        </div>
        <Button type="submit" class="black-text">Guardar</Button>
        <div class="card flex justify-content-center">
          <Button label="Show" icon="pi pi-external-link" @click="visible = true" />
          <Dialog
              v-model:visible="visible"
              modal
              header="Header"
              :style="{ width: '50rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
          >
            <DataTable :value="costesGastos" class="text-surface-500 dark:text-surface-400 block mb-8">
              <Column field="tipoGasto" header="Tipo de Gasto"></Column>
              <Column field="motivoGasto" header="Motivo de Gasto"></Column>
              <Column field="valorExpresado.valor" header="Valor Expresado"></Column>
            </DataTable>
          </Dialog>
          <Button label="Limpiar" icon="pi pi-times" @click="deleteCostesGastos" />
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
import FinanceDataService from '../../services/FinanceDataService.js';
import 'primeicons/primeicons.css';
import { ref } from 'vue';

export default {
  name: 'CostsAndExpensesInformation',
  data() {
    return {
      visible: false,
      costesGastos: [],
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
    storeCostsAndExpenses() {
      this.costesGastos.push({ ...this.costsAndExpenses });
      console.log('Stored data locally:', this.costesGastos);
    },
    async sendAllCostsAndExpenses() {
      try {
        for (const item of this.costesGastos) {
          const dataToSend = {
            ...item,
            tipoGasto: item.tipoGasto.value
          };
          const response = await FinanceDataService.createCostesGastos(dataToSend);
          console.log('Costs and Expenses created:', response.data);
        }
        this.costesGastos = []; // Clear local storage after sending
      } catch (error) {
        console.error('Error sending Costs and Expenses:', error.response || error.message);
      }
    },
    toggleCurrency() {
      this.currencySymbol = this.currencySymbol === '$' ? 'S/.' : '$';
    },
    async fetchCostesGastos() {
      try {
        const response = await FinanceDataService.getAllCostesGastos();
        this.costesGastos = response.data;
        console.log('Fetched data:', this.costesGastos);
      } catch (error) {
        console.error('Error fetching Costs and Expenses:', error.response || error.message);
      }
    },
    async deleteCostesGastos() {
      try {
        const response = await FinanceDataService.deleteCostesGastosAll();
        console.log('Costs and Expenses deleted:', response.data);
      } catch (error) {
        console.error('Error deleting Costs and Expenses:', error.response || error.message);
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
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