<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService.js';

const route = useRoute();
const router = useRouter();
const walletResults = ref([]);
const columns = [
  { field: 'numeroConsulta', header: 'Número de Consulta' },
  { field: 'fechaGiro', header: 'Fecha de Giro' },
  { field: 'valorNomAplicando', header: 'Valor Nominal Aplicando' },
  { field: 'fechaVencimiento', header: 'Fecha de Vencimiento' },
  { field: 'dias', header: 'Días' },
  { field: 'retencion', header: 'Retención' },
  { field: 'tasaEfectiva', header: 'Tasa Efectiva' },
  { field: 'descuento', header: 'Descuento' },
  { field: 'valorDescuento', header: 'Valor de Descuento' },
  { field: 'costeInicial', header: 'Coste Inicial' },
  { field: 'costeFinal', header: 'Coste Final' },
  { field: 'valorNeto', header: 'Valor Neto' },
  { field: 'valorRecibir', header: 'Valor a Recibir' },
  { field: 'valorEntregado', header: 'Valor Entregado' },
  { field: 'tceaPorcentaje', header: 'TCEA Porcentaje' }
];

const fetchWalletResults = () => {
  const id = route.params.id;
  FinanceDataService.obtenerResultadoDeCartera(id)
      .then(response => {
        walletResults.value = response.data; // Asignar la lista de resultados
      })
      .catch(error => {
        console.error('Error fetching wallet results:', error);
      });
};


const handleRowClick = (rowData) => {
  const { documentoId, type } = rowData.data;
  console.log('Datos de la fila:', rowData.data);  // Verifica que rowData.data tiene los datos completos

  router.push({
    name: type === 'LETRA' ? 'LetraDetail' : 'FacturaDetail',
    params: { id: documentoId },
    state: { data: rowData.data },  // Pasa todos los datos completos de la fila
  });
};


onMounted(fetchWalletResults);
</script>





<template>
  <div>
    <div>
      <h2>Resultados de la Cartera</h2>
      <div class="table-wrapper">
        <DataTable :value="walletResults" @row-click="handleRowClick">
          <Column
              v-for="col in columns"
              :key="col.field"
              :field="col.field"
              :header="col.header"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>


<style scoped>
.table-wrapper {
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
}

DataTable {
  display: flex;
  flex-wrap: wrap;
}

Column {
  flex: 1 1 auto;

}
</style>

