<script>
import LetterItem from "../../components/invoice/LetterItem.vue";

export default {
  name: 'DocumentLetter',
  components: {
    LetterItem
  },
  data() {
    return {
      letter: {
        number: 'LET-001',
        date: '2023-10-01',
        amount: 500,
        status: 'Pending'
      }
    };
  }
};
</script>

<template>
  <div class="letter-view-container">
    <h2>Vista de Letra</h2>
    <LetterItem :letter="letter" />
  </div>
</template>

<style>
.letter-view-container {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 15px;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  margin: 20px auto;
}

h2 {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
