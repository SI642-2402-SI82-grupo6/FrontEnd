<template>
  <Card>
    <template #content>
      <DataTable :value="[result]" class="result-item">
        <Column field="numeroConsulta" header="Número de Consulta"></Column>
        <Column field="fechaGiro" header="Fecha de Giro"></Column>
        <Column field="valorNomAplicando" header="Valor Nominal Aplicando"></Column>
        <Column field="fechaVencimiento" header="Fecha de Vencimiento"></Column>
        <Column field="dias" header="Días"></Column>
        <Column field="retencion" header="Retención"></Column>
        <Column field="tasaEfectiva" header="Tasa Efectiva"></Column>
        <Column field="descuento" header="Descuento"></Column>
        <Column field="valorDescuento" header="Valor Descuento"></Column>
        <Column field="costeInicial" header="Coste Inicial"></Column>
        <Column field="costeFinal" header="Coste Final"></Column>
        <Column field="valorNeto" header="Valor Neto"></Column>
        <Column field="valorRecibir" header="Valor a Recibir"></Column>
        <Column field="valorEntregado" header="Valor Entregado"></Column>
        <Column field="tceaPorcentaje" header="TCEA Porcentaje"></Column>

      </DataTable>

    </template>
  </Card>
</template>
<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewDetails() {
      this.$router.push({ name: 'ResultDetails', params: { id: this.result.id } });
    }
  }
};
</script>

<style scoped>
.result-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>