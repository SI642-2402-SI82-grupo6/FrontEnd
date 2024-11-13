<script setup>

import wallet from '../../assets/walet.jpg';
</script>

<template>


  <div class="content-container">
    <!-- Accordion para Características Clave -->
    <div class="accordion-container">
      <tag>Características Clave</tag>
      <Accordion multiple>
        <AccordionTab header="Soporte para monedas múltiples">
          <p>Funciona tanto con soles como con dólares.</p>
        </AccordionTab>

        <AccordionTab header="Configuración flexible de tasas">
          <p>Permite seleccionar entre tasas nominales o efectivas.</p>
        </AccordionTab>

        <AccordionTab header="Cálculo automático de TCEA">
          <p>Genera la Tasa de Coste Efectivo Anual (TCEA) para toda la cartera.</p>
        </AccordionTab>

        <AccordionTab header="Seguridad mediante autenticación de usuario">
          <p>Requiere usuario y clave para garantizar acceso seguro.</p>
        </AccordionTab>

        <AccordionTab header="Reportes detallados e impresión en cualquier momento">
          <p>Permite ver y generar reportes completos de letras/facturas.</p>
        </AccordionTab>
      </Accordion>
    </div>

    <!-- Accordion para Beneficios para el Cliente -->
    <div class="accordion-container">
      <tag>Beneficios para el Cliente</tag>
      <Accordion multiple>
        <AccordionTab header="Eficiencia">
          <p>Ahorra tiempo y esfuerzo en la administración de letras/facturas.</p>
        </AccordionTab>

        <AccordionTab header="Seguridad">
          <p>Acceso seguro mediante credenciales de usuario.</p>
        </AccordionTab>

        <AccordionTab header="Precisión Financiera">
          <p>Ofrece cálculos detallados y precisos de costos.</p>
        </AccordionTab>

        <AccordionTab header="Adaptabilidad">
          <p>Compatible con soles, dólares y tasas de interés variables.</p>
        </AccordionTab>
      </Accordion>
    </div>

    <Image :src="wallet" class="wallet-image" />
  </div>
</template>


<style scoped>
.content-container {

  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.accordion-container {
  flex-grow: 1;
  margin-right: 20px;
}

h2 {

  font-size: 1.5rem;
}

.wallet-image {
  margin-left: 10px;
  width: auto;
  height: auto;
}
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
    align-items: flex-start; /* Align items to the left */
  }

  .wallet-image {
    margin-left: 0;
    margin-top: 20px;
    width: 100%
  }
}
</style>