<script setup>
import { defineProps, defineEmits } from 'vue';
import FinanceDataService from "../../services/FinanceDataService.js";

const props = defineProps({
  letter: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['letter-deleted']);

const deleteLetter = (id) => {
  FinanceDataService.deleteLetra(id)
      .then(() => {
        emit('letter-deleted');
      })
      .catch(error => {

        console.error('Error deleting letter:', error);
      });
};

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
    <Column header="Actions">
      <template #body="slotProps">
        <Button @click="deleteLetter(letter.id)" label="Delete"/>
      </template>
    </Column>
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