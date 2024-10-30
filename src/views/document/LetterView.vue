<script>
import LetterInformation from '../../components/letter/LetterInformation.vue';
import RateAndTermInformation from '../../components/RateAndTerm/RateAndTermInformation.vue';
import CostsAndExpensesInformation from '../../components/costsAndExpenses/CostsAndExpensesInformation.vue';

export default {
  name: 'DocumentLetter',
  components: {
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

<template>

    <h2>Vista de Letra</h2>
    <div class="top-container">

        <RateAndTermInformation ref="rateAndTermInfo"/>


        <LetterInformation ref="letterInfo"/>

    </div>

      <CostsAndExpensesInformation ref="costsAndExpensesInfo"/>

    <Button @click="submitAll" label="Agregar Letra" class="submit-button"/>

</template>

<style>
.letter-view-container {
  background-color: #000;
  padding: 40px;
  border-radius: 15px;
  text-align: left;
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  color: #fff; /* Ensure text is visible on black background */
}

h2 {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
}

.top-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.left, .right {
  flex: 1;
  min-width: 300px;
}

.bottom {
  margin-top: 20px;
}

.submit-button {
  margin-top: 20px;
  width: 100%;
  color: black;

}
</style>