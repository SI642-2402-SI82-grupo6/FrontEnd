<template>
  <Card title="Resultados de Consulta">
    <template #content>
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
      resultadosConsulta: []
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
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>