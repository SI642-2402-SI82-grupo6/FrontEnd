<template>
  <Card title="Resultados de Consulta">
    <template #content>
      <Button label="Consultar Resultados" icon="pi pi-search" @click="fetchResultadosCartera" />
      <div v-if="resultadosCartera.length">
        <DataTable :value="resultadosCartera">
          <Row field="valorTotalRecibir" header="Valor Total a Recibir"></Row>
          <Row field="tcea" header="TCEA"></Row>
        </DataTable>
      </div>
      <Button label="Consultar Resultados" icon="pi pi-search" @click="fetchResultadosConsulta" />
      <div v-if="resultadosConsulta.length">
        <ResultItem v-for="result in resultadosConsulta" :key="result.id" :result="result" />
      </div>
    </template>
  </Card>
</template>

<script>
import FinanceDataService from '../../services/FinanceDataService.js';
import ResultItem from '../results/ResultItem.vue';

export default {
  components: {
    ResultItem
  },
  data() {
    return {
      resultadosConsulta: [],
      resultadosCartera: []
    };
  },
  methods: {
    async fetchResultadosConsulta() {
      try {
        const response = await FinanceDataService.createResultadosConsulta();
        this.resultadosConsulta = response.data;
        console.log('Fetched resultados consulta:', this.resultadosConsulta);
      } catch (error) {
        console.error('Error fetching resultados consulta:', error.response || error.message);
      }
    },
    async fetchResultadosCartera() {
      try {
        const response = await FinanceDataService.getResultadosCartera();
        this.resultadosCartera = response.data;
        console.log('Fetched resultados cartera:', this.resultadosCartera);
      } catch (error) {
        console.error('Error fetching resultados cartera:', error.response || error.message);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>