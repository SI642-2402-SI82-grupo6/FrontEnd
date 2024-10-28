<script >

export default {
  components: { },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewDetails() {
    }
  }
};
</script>

<template>
  <Card>
    <div class="result-item">
      <h4>{{ result.title }}</h4>
      <p>{{ result.description }}</p>
      <pv-button label="Detalles" icon="pi pi-info-circle" @click="viewDetails" />
    </div>
  </Card>
</template>

<style >
.result-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>