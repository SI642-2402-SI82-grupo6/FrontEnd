<script>
import LetterInformation from '../../components/letter/LetterInformation.vue';
import RateAndTermInformation from '../../components/RateAndTerm/RateAndTermInformation.vue';
import CostsAndExpensesInformation from '../../components/costsAndExpenses/costsAndExpensesInformation.vue';
import QueryResults from "../../components/results/QueryResults.vue";
import MainMenu from "../../components/Menu.vue";

export default {
  name: 'DocumentLetter',
  components: {
    MainMenu,
    QueryResults,
    LetterInformation,
    RateAndTermInformation,
    CostsAndExpensesInformation
  },
  methods: {
    async submitAll() {
      try {
        await this.$refs.letterInfo.submitLetter();
        await this.$refs.rateAndTermInfo.submitRateAndTerm();
        await this.$refs.costsAndExpensesInfo.submitCostsAndExpenses();
        alert('All submissions successful');
      } catch (error) {
        console.error('Error submitting forms:', error);
        alert('Error submitting forms');
      }
    }
  }
};
</script>

<template id="app">
  <Card>
  <template #header>
    <MainMenu/>
  </template>
  </Card>
  <div class="p-grid p-nogutter equal-height">
    <div class="p-col-12 p-md-6">
      <!-- Rate And Term Information -->
      <RateAndTermInformation ref="rateAndTermInfo" />
    </div>
    <div class="p-col-12 p-md-6">
      <!-- Letter Information -->
      <LetterInformation ref="letterInfo" />
    </div>
  </div>
  <div class="p-grid p-nogutter">
    <div class="p-col-12">
      <!-- Costs And Expenses Information -->
      <CostsAndExpensesInformation ref="costsAndExpensesInfo" />
    </div>
  </div>
  <Button @click="submitAll" label="Agregar Letra" class="submit-button" />
  <div class="p-grid p-nogutter">
    <div class="p-col-12">
      <QueryResults/>
    </div>
  </div>
</template>




<style scoped>
.p-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}

.p-nogutter {
  margin-right: 0;
  margin-left: 0;
}

.p-col-12 {
  flex: 1 1 100%;
  box-sizing: border-box;
}

.p-col-12.p-md-6 {
  flex: 1 1 50%;
}

.submit-button {
  display: block;
  margin: 20px auto;
}

.p-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}

.p-nogutter {
  margin-right: 0;
  margin-left: 0;
}

.p-col-12 {
  flex: 1 1 100%;
  box-sizing: border-box;
}

.p-col-12.p-md-6 {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
}

.equal-height {
  display: flex;
}

.equal-height > .p-col-12.p-md-6 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.equal-height > .p-col-12.p-md-6 > * {
  flex-grow: 1;
}

.submit-button {
  display: block;
  margin: 20px auto;
}


</style>
