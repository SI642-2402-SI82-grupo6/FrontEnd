<template>
  <Card>
    <template #content>
      <h3 class="move-right">Información de Tasa y Plazo</h3>
      <div class="card flex justify-center move-right">
        <Form @submit.prevent="submitRateAndTerm">
          <div class="p-grid p-fluid">

            <!-- Tipo de Tasa -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="tipoTasa">
                Tipo Tasa <i class="pi pi-info-circle"> :</i>
              </label>
              <Dropdown
                  id="tipoTasa"
                  v-model="rateAndTerm.tipoTasa"
                  :options="tipoTasaOptions"
                  placeholder="Seleccione tipo de tasa"
                  required
                  class="input-same-width"
              />
            </div>

            <!-- Tasa Nominal -->
            <div v-if="rateAndTerm.tipoTasa === 'NOMINAL'" class="p-field p-col-12 p-md-6 field-inline">
              <label for="tasaNominal">
                Tasa Nominal <i class="pi pi-percentage"> :</i>
              </label>
              <InputNumber
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  id="tasaNominal"
                  :prefix="symbol"
                  v-model="rateAndTerm.tasaNominal"
                  required
                  class="input-same-width"
              />
            </div>

            <!-- Plazo de Tasa -->
            <div v-if="rateAndTerm.tipoTasa === 'NOMINAL'" class="p-field p-col-12 p-md-6 field-inline">
              <label for="plazoDeTasaOption">
                Plazo de Tasa <i class="pi pi-calendar"> :</i>
              </label>
              <Dropdown
                  id="plazoDeTasaOption"
                  v-model="rateAndTerm.plazoDeTasaOption"
                  :options="plazoDeTasaOptions"
                  placeholder="Seleccione plazo de tasa"
                  required
                  class="input-same-width"
              />
              <InputNumber
                  v-if="rateAndTerm.plazoDeTasaOption === 'Especial'"
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  id="plazoDeTasa"
                  v-model="rateAndTerm.plazoDeTasa"
                  required
                  class="input-same-width"
              />
            </div>

            <!-- Periodo Capital -->
            <div v-if="rateAndTerm.tipoTasa === 'NOMINAL'" class="p-field p-col-12 p-md-6 field-inline">
              <label for="periodoCapital">
                Periodo Capital <i class="pi pi-clock"> :</i>
              </label>
              <InputNumber
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  id="periodoCapital"
                  v-model="rateAndTerm.periodoCapital"
                  required
                  class="input-same-width"
              />
            </div>

            <!-- Tasa Efectiva -->
            <div v-if="rateAndTerm.tipoTasa === 'EFECTIVA'" class="p-field p-col-12 p-md-6 field-inline">
              <label for="tasaEfectiva">
                Tasa Efectiva <i class="pi pi-percentage"> :</i>
              </label>
              <InputNumber
                  mode="decimal"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  id="tasaEfectiva"
                  v-model="rateAndTerm.tasaEfectiva"
                  :prefix="symbol"
                  required
                  class="input-same-width"
              />
            </div>

            <!-- Plazo Efectivo -->
            <div v-if="rateAndTerm.tipoTasa === 'EFECTIVA'" class="p-field p-col-12 p-md-6 field-inline">
              <label for="plazoEfectivo">
                Plazo Efectivo <i class="pi pi-calendar"> :</i>
              </label>
              <InputNumber
                  mode="decimal"
                  :invalid="rateAndTerm.plazoEfectivo <= 0"
                  :minFractionDigits="0"
                  :maxFractionDigits="4"
                  id="plazoEfectivo"
                  v-model="rateAndTerm.plazoEfectivo"
                  required
                  class="input-same-width"
              />
              <message v-if="!rateAndTerm.plazoEfectivo" severity="error" text="El valor debe ser mayor a 0" >Debe ser mayor a 0</message>
            </div>

            <!-- Fecha de Descuento -->
            <div class="p-field p-col-12 p-md-6 field-inline">
              <label for="fechaDescuento">
                Fecha Descuento <i class="pi pi-calendar"> :</i>
              </label>
              <Calendar id="fechaDescuento" v-model="rateAndTerm.fechaDescuento" required class="input-same-width"/>
            </div>

          </div>
        </Form>
      </div>
    </template>
  </Card>
</template>

<script>
import FinanceDataService from '../../services/FinanceDataService.js';
import moment from 'moment';
import {reactive} from 'vue';

export default {
  name: 'RateAndTermInformation',
  data() {
    return {
      rateAndTerm: {
        tipoTasa: 'EFECTIVA',
        tasaNominal: 0,
        plazoDeTasa: 0,
        plazoDeTasaOption: '',
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
        const {plazoDeTasaOption, ...dataToSend} = this.rateAndTerm;

        if (dataToSend.tipoTasa === 'NOMINAL') {
          dataToSend.tasaNominal = dataToSend.tasaNominal / 100;
        } else if (dataToSend.tipoTasa === 'EFECTIVA') {
          dataToSend.tasaEfectiva = dataToSend.tasaEfectiva / 100;
        }

        dataToSend.fechaDescuento = moment(dataToSend.fechaDescuento).format('YYYY-MM-DD');

        console.log('Enviando datos:', JSON.stringify(dataToSend, null, 2));

        const response = await FinanceDataService.createTasaYPlazo(dataToSend);
        console.log('Tasa y Plazo creados:', response.data);
      } catch (error) {
        console.error('Error al crear Tasa y Plazo:', error.response ? error.response.data : error.message);
      }
    }
  }
}
</script>

<style scoped>
.field-inline {
  display: flex;
  align-items: center;
  gap: 3rem;
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

.p-grid {
  gap: 5px;
}

.p-field {
  margin-bottom: 5px;
}

.move-right {
  margin-left: 2.5rem;
}
</style>