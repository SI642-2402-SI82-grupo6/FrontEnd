<script setup>
import { ref } from 'vue';
import FinanceDataService from '../../services/FinanceDataService.js';
const formData = ref({
  name: '',
  typeMoney: ''
});
const submitForm = () => {


  console.log('Form Data:', formData.value);

  FinanceDataService.createCartera(formData.value);

};
const options = ref([
  { name: 'S/. Soles Peruanos', value: 'S/.' },
  { name: 'USD Dolares Americanos ', value: '$' },

]);

</script>

<template>
  <Form @submit="submitForm">
    <div class="p-grid p-fluid">
      <!-- Name Field -->
      <div class="p-field p-col-12 p-md-6">
        <label for="name">Name</label>
        <InputText id="name" v-model="formData.name" required />
      </div>

      <!-- Type Money Field -->
      <div class="p-field p-col-12 p-md-6">
        <div class="card flex justify-center">
          <SelectButton v-model="formData.typeMoney" :options="options" optionLabel="name" optionValue="value"  aria-labelledby="custom" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="p-field p-col-12">
        <Button type="submit" label="Submit" />
      </div>
    </div>
  </Form>
</template>

<style scoped>
.p-field {
  margin-bottom: 1rem;
}
</style>