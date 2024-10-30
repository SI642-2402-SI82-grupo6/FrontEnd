<script>
import ResultItem from './ResultItem.vue';

export default {
  name: 'QueryResults',
  components: { ResultItem },
  props: {
    results: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
  <div class="query-results">
    <h2>Query Results</h2>
    <ResultItem
        v-for="(result, index) in results"
        :key="index"
        :result="result"
    />
  </div>
</template>

<style scoped >
.query-results {
  display: grid;
  gap: 1rem;
}
</style>