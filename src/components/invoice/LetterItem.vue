<script>
export default {
  props: {
    letter: {
      type: Object,
      required: true,
    }
  },
  methods: {
    viewDetails() {
      if (this.letter) {
        alert(`Detalles de la letra:\nNúmero: ${this.letter.number}\nFecha: ${this.letter.date}\nMonto: ${this.letter.amount}\nEstado: ${this.letter.status}`);
      }
    }
  }
};
</script>

<template>
  <pv-card v-if="letter">
    <div class="letter-item">
      <div class="letter-header">
        <h3>{{ letter.number }}</h3>
        <p>{{ letter.date }}</p>
      </div>
      <div class="letter-details">
        <p>Monto: {{ letter.amount }}</p>
        <p>Estado: {{ letter.status }}</p>
      </div>
      <pv-button label="Ver detalles" icon="pi pi-search" @click="viewDetails"/>
    </div>
  </pv-card>
</template>

<style>
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
