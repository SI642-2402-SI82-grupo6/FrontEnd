<script setup>
import {ref, onMounted} from 'vue';

import FinanceDataService from "../../services/FinanceDataService.js";
import LetterItem from "./LetterItem.vue";

const letters = ref([]);

const fetchLetters = () => {
  FinanceDataService.getAllLetras()
      .then(response => {
        letters.value = response.data;
        console.log('Letters:', letters.value);
      })
      .catch(error => {
        console.error('Error fetching letters:', error);
      });
};

onMounted(fetchLetters);
</script>

<template>
  <div>
    <div v-if="letters.length" v-for="letter in letters" :key="letter.id">
      <LetterItem :letter="letter"/>
    </div>

    <div v-else>
      <ProgressSpinner />
    </div>
  </div>
</template>

<style scoped>
</style>