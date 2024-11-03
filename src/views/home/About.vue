<script setup>
import sergioImage from '../../assets/sergio.png';
import marioImage from '../../assets/mario.png';
import fabrizioImage from '../../assets/fabrizio.png';
import MainMenuVue from "../../components/MainMenu.vue";
import { ref } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
const tabs = ref([
  { title: 'Title 1', content: 'Content 1', value: '0' },
  { title: 'Title 2', content: 'Content 2', value: '1' },
  { title: 'Title 3', content: 'Content 3', value: '2' }
]);
</script>
<template>

  <Card>
    <template #header>
      <Tag value="Acerca del proyecto"></Tag>
    </template>
    <template #content>
      <p>Pyme Walt nace como una solución innovadora, diseñada especialmente para pequeñas y medianas empresas que buscan optimizar la administración de sus carteras de descuento de letras y facturas. Este proyecto ofrece una plataforma web y móvil que permite gestionar, analizar y reportar los valores descontados de forma segura, ágil y profesional.

        Imagina una herramienta que no solo maneje operaciones en soles y dólares de manera indistinta, sino que también te permita elegir entre tasas nominales o efectivas, ajustándose a tus necesidades específicas. Con Pyme Walt, obtendrás un cálculo preciso de la Tasa de Coste Efectivo Anual (TCEA) para cada cartera de letras y facturas descontadas, brindándote una visión completa del costo de tu cartera en cualquier fecha.

        Además, nuestra aplicación se centra en la eficiencia y seguridad de acceso: cada usuario debe ingresar con sus credenciales, garantizando que la información esté protegida. Desde el ingreso de datos completos de cada letra o factura hasta la consolidación de reportes detallados, tendrás acceso a toda la información de forma clara y organizada, con la capacidad de imprimir o mostrar los reportes en el momento que lo necesites.

        Pyme Walt es la herramienta ideal para empresas que desean tercerizar la administración de su cartera, enfocándose en la reducción de esfuerzo administrativo y en la obtención de información financiera precisa y en tiempo real. Confía en Pyme Walt y simplifica la administración de tus letras y facturas con una solución que entiende las necesidades específicas de las pequeñas y medianas empresas.

      </p>
    </template>
  </Card>

  <Card>
    <template #header>
      <Tag value="Equipo de desarrollo"></Tag>
    </template>
    <template #content>
      <p>Este es el equipo de desarrollo de la aplicación</p>
      <Accordion>
        <AccordionTab header="Team Leader">
          <Accordion>
            <AccordionTab header="Sergio Joel Pecan Pariona">

              <div class="image-text-container">
                <Image :src="sergioImage" alt="sergio" width="100" />
                <div class="text-content">
                  a nuestro espacio. Soy Sergio Joel Pecan Pariona, el Team Leader de Pyme Walt. Desde el inicio, he tenido la fortuna de liderar un equipo de compañeros excepcionalmente talentosos y dedicados. Juntos, compartimos una visión clara: ofrecer soluciones innovadoras que marquen una verdadera diferencia para las pequeñas y medianas empresas.
                  Mi rol como líder de equipo consiste en guiar a nuestros expertos, fomentar una cultura colaborativa y asegurar que cada proyecto no solo cumpla con los más altos estándares, sino que también esté alineado con las necesidades reales de nuestros clientes. Creemos que el éxito se logra a través de la combinación de creatividad, estrategia y una ejecución precisa. Mi enfoque es liderar desde el ejemplo, promoviendo un ambiente de transparencia, comunicación abierta y crecimiento continuo.
                  En Pyme Walt, cada miembro de nuestro equipo aporta una mezcla única de habilidades y perspectivas, y juntos trabajamos para crear soluciones que generen un impacto duradero. Estoy profundamente orgulloso de lo que hemos logrado hasta ahora y entusiasmado por todo lo que está por venir.
                  Gracias por visitarnos. No dudes en ponerte en contacto si tienes alguna pregunta o si deseas colaborar con nosotros. ¡Será un placer conocerte!
                </div>
              </div>
            </AccordionTab>
          </Accordion>
        </AccordionTab>
        <AccordionTab header="Integrates del equipo">
          <Accordion>
            <AccordionTab header="Integrante 1">
              <Accordion>
                <AccordionTab header="Fabrizio Amir Leon Vivas">
                  <div class="image-text">
                    <Image :src="fabrizioImage" alt="fabrizio" width="100" />
                    <div class="text-content">
                      Hola, soy Fabrizio Amir Leon Vivas, ingeniero de software de 20 años de Lima, Perú, y actualmente estoy cursando la carrera de Ingeniería de Software. Soy una persona enfocada en mejorar constantemente mis habilidades técnicas y académicas, siempre buscando aprender y aplicar nuevas tecnologías para crear soluciones efectivas. En los proyectos, me esfuerzo por mantener un enfoque estructurado y colaborativo, ya que sé que esto es clave para un desarrollo eficiente y para lograr resultados de alta calidad.
                    </div>
                  </div>
                </AccordionTab>
              </Accordion>
            </AccordionTab>
            <AccordionTab header="Integrante 2">
              <Accordion>
                <AccordionTab header="Mario Joaquin Lopez Acuña">
                  <div class="image-text-container">
                    <Image :src="marioImage" alt="mario" width="100" />
                    <div class="text-content">
                      Hola, soy Mario Joaquin Lopez Acuña, un apasionado desarrollador de software con experiencia en el diseño y desarrollo de aplicaciones web y móviles. En Pyme Walt, mi enfoque principal es garantizar que cada funcionalidad de la aplicación sea intuitiva, eficiente y fácil de usar. Creo que la tecnología debe ser accesible para todos, y mi objetivo es crear soluciones que simplifiquen la vida de nuestros usuarios.
                      Mi pasión por la programación comenzó desde temprana edad, y desde entonces he trabajado en una variedad de proyectos que van desde aplicaciones de comercio electrónico hasta sistemas de gestión de contenido. En Pyme Walt, tengo la oportunidad de combinar mi experiencia técnica con mi creatividad para ofrecer una experiencia de usuario excepcional.
                      Siempre estoy buscando nuevas formas de mejorar y aprender, y me enorgullece formar parte de un equipo tan talentoso y diverso. Juntos, estamos creando una aplicación que cambiará la forma en que las empresas gestionan sus carteras de descuento de letras y facturas. ¡Gracias por visitarnos y espero que disfrutes de tu experiencia en Pyme Walt!
                    </div>
                    </div>
                </AccordionTab>
              </Accordion>
            </AccordionTab>
            <AccordionTab header="Integrante 3">
              content 1
            </AccordionTab>
            <AccordionTab header="Integrante 4">
              content 1
            </AccordionTab>
          </Accordion>
        </AccordionTab>
      </Accordion>
    </template>
  </Card>

</template>

<style scoped>
.image-text-container {
  display: flex;
  align-items: center;
  justify-content: center;

}

.text-content {
  margin-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
@media (max-width: 768px) {
  .image-text-container {
    flex-wrap: wrap;
  }
}
</style>