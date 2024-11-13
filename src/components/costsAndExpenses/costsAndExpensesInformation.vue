<template>
  <Card title="Gastos">
    <template #content>
      <h3>Agregar Gastos</h3>
      <form >
        <div class="move-right">
          <div class="p-field p-col-12 p-md-6 field-inline">
            <label for="tipoGasto" class="black-text">
              Tipo Gasto <i class="pi pi-info-circle"> :</i>
            </label>
            <Dropdown
                v-model="costsAndExpenses.tipoGasto"
                :options="options"



                placeholder="Selecciona un tipo de gasto"

                class="input-same-width"
            />
          </div>
          <div class="p-field p-col-12 p-md-6 field-inline">
            <label for="motivoGasto">
              Motivo Gasto <i class="pi pi-info-circle"> :</i>
            </label>
            <Dropdown
                v-model="costsAndExpenses.motivoGasto"
                :options="motivoGastoOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona un motivo de gasto"
                class="input-same-width"
            />
          </div>
          <div class="p-field p-col-12 p-md-6 field-inline">
            <label class="black-text">
              ¿Es Porcentaje? <i class="pi pi-percentage"> :</i>
            </label>
            <Checkbox
                id="esPorcentaje"
                v-model="costsAndExpenses.valorExpresado.esPorcentaje"
                @click="toggleCurrency"
                :binary="true"
                class="input-same-width"
            />
          </div>
          <div class="p-field p-col-12 p-md-6 field-inline">
            <label>
              Valor <i class="pi pi-dollar"> :</i>
            </label>

            <InputNumber
                v-model="costsAndExpenses.valorExpresado.valor"
                :invalid="costsAndExpenses.valorExpresado.valor <= 0"
                mode="decimal"
                :minFractionDigits="0"
                :maxFractionDigits="4"
                :prefix="currencySymbol"
                placeholder="Amount"
                required
                class="input-same-width"
            />
            <Message v-if="!costsAndExpenses.valorExpresado.valor" severity="error" variant="outlined">No puede ser negativo o cero</Message>

          </div>
        </div>

        <div class="card flex justify-content-center">
          <Button type="submit" class="black-text button-spacing" @click.prevent="storeCostsAndExpenses">Guardar</Button>
          <Button label="Show" icon="pi pi-external-link" @click="visible = true" class="button-spacing" />
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
              <Column field="valorExpresado.valor" header="Valor Expresado">
              </Column>
            </DataTable>
          </Dialog>
          <Button label="Limpiar" icon="pi pi-times" @click="deleteCostesGastos" class="button-spacing" />
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
        motivoGasto: 'Portes',
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
      options: ['INICIAL', 'FINAL'],
      currencySymbol: '$',
    };
  },

  methods: {
    storeCostsAndExpenses() {
      // Usar JSON.parse y JSON.stringify para hacer una copia profunda
      this.costesGastos.push(JSON.parse(JSON.stringify(this.costsAndExpenses)));
      console.log('Stored data locally:', this.costesGastos);
    },

    async sendAllCostsAndExpenses() {
      try {
        for (const item of this.costesGastos) {

          const response = await FinanceDataService.createCostesGastos(item);
          console.log('Costs and Expenses created:', response.data);
        }
        this.costesGastos = []; // Clear local storage after sending
      } catch (error) {
        console.error('Error sending Costs and Expenses:', error.response || error.message);
      }
    },
    toggleCurrency() {
      this.currencySymbol = this.currencySymbol === '%' ? '$' : '%';
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
      for (const item of this.costesGastos) {
        try {
          const response = await FinanceDataService.deleteCostesGastos(item.id);
          console.log('Costs and Expenses deleted:', response.data);
        } catch (error) {
          console.error('Error deleting Costs and Expenses:', error.response || error.message);
        }
      }
    },

  },

};
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
  width: 100%;
  max-width: 300px;
}

.p-field {
  margin-bottom: 5px;
}

.move-right {
  margin-left: 35rem;
}

.button-spacing {
  margin: 2rem 1rem 0 1rem;
}
</style>