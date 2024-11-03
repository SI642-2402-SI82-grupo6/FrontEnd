<template>
  <footer class="footer">
    <div class="footer-content">
      <p>Creado por Estudiante de UPC 2024-2 Curso Finanzas e Ingeniería Económica Equipo 6</p>
      <div class="social-icons">
        <Button icon="pi pi-facebook" class="social-button" @click="goTo('https://www.facebook.com')" />
        <Button icon="pi pi-twitter" class="social-button" @click="goTo('https://www.twitter.com')" />
        <Button icon="pi pi-instagram" class="social-button" @click="goTo('https://www.instagram.com')" />
      </div>
    </div>
  </footer>
</template>

<script setup>
const goTo = (url) => {
  window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
};
</script>

<style scoped>
.footer {
  background-color: #f0f0f0; /* Color de fondo del footer */
  padding: 20px; /* Espaciado alrededor del contenido */
  text-align: center; /* Centra el texto */
}

.footer-content {
  display: flex;
  flex-direction: column; /* Alinea el contenido en columna */
  align-items: center; /* Centra el contenido */
}

.social-icons {
  margin-top: 10px; /* Espaciado superior para las redes sociales */
}

.social-button {
  margin: 0 5px; /* Espaciado entre los botones */
  border: none; /* Sin borde */
}
</style>
