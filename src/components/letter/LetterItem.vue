<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  letter: {
    type: Object,
    required: true
  }
});

const viewDetails = () => {
  console.log('Viewing details for letter:', props.letter);
};
</script>

<template>
  <DataTable :value="[letter]" responsiveLayout="scroll">
    <!-- Cabeceras de la tabla -->
    <Column field="fechaGiro" header="Fecha de Giro"></Column>
    <Column field="fechaVencimiento" header="Fecha de Vencimiento"></Column>
    <Column field="valorNominal" header="Valor Nominal"></Column>
    <Column field="retencion" header="Retención"></Column>


  </DataTable>
</template>

<style scoped>
.letter-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.letter-header {
  display: flex;
  justify-content: space-between;
}
</style>