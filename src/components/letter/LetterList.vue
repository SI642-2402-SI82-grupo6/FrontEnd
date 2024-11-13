<script setup>
import { ref, onMounted } from 'vue';
import FinanceDataService from "../../services/FinanceDataService.js";
import LetterItem from "./LetterItem.vue";

const letters = ref([]);
const timeoutReached = ref(false);

const fetchLetters = () => {
  const timeout = setTimeout(() => {
    timeoutReached.value = true;

  }, 100);
  FinanceDataService.getAllLetras()
      .then(response => {
        clearTimeout(timeout);
        letters.value = response.data;
        console.log('Letters:', letters.value);
      })
      .catch(error => {
        timeoutReached.value = true;
        console.error('Error fetching letters:', error);
      });
};

onMounted(fetchLetters);
</script>

<template>
  <div>
    <div v-if="letters.length" v-for="letter in letters" :key="letter.id">
      <LetterItem :letter="letter" @letter-deleted="fetchLetters"/>
    </div>

    <div v-else>
      <div v-if="timeoutReached">No se ha encontrado ninguna letra.</div>
      <div v-else>
        <ProgressSpinner />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>