<script setup>
import { useRouter } from 'vue-router';
import { ref, toRefs } from "vue";
import FinanceDataService from '../../services/FinanceDataService.js';

const props = defineProps({
  wallet: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      typeMoney: '',
      creationDate: '',
      valorTotalRecibir: 0,
      tcea: 0
    })
  }
});
const { wallet } = toRefs(props);

const router = useRouter();
const documents = ref([]);
const visible = ref(false);
const documentDetails = ref({});

const viewResult = (id) => {
  router.push({ name: 'WalletResult', params: { id: id } });
};

const getAllDocument = () => {
  FinanceDataService.obtenerDocumentosCreados()
      .then(response => {
        documents.value = response.data;
        fetchDocumentDetails();
        visible.value = true;
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
      });
};

const fetchDocumentDetails = () => {
  documentDetails.value = {};

  documents.value.forEach(document => {
    if (document.tipoDocumento === 'LETRA') {
      FinanceDataService.getLetra(document.documentoId)
          .then(response => {
            documentDetails.value[document.documentoId] = response.data;
          })
          .catch(error => {
            console.error('Error fetching letra:', error);
          });
    } else if (document.tipoDocumento === 'FACTURA') {
      FinanceDataService.getFactura(document.documentoId)
          .then(response => {
            documentDetails.value[document.documentoId] = response.data;
          })
          .catch(error => {
            console.error('Error fetching factura:', error);
          });
    }
  });
};

const agregarDocumento = (carteraId, documentId) => {
  FinanceDataService.agregarDocumento(carteraId, documentId)
      .then(response => {
        console.log('Documento agregado exitosamente:', response.data);
      })
      .catch(error => {
        console.error('Error al agregar documento:', error);
      });
};

const handleAddDocumentClick = () => {
  getAllDocument();
};

const formatHeader = (key) => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
};
</script>

<template>
  <Card>
    <template #content>
      <div class="wallet-item">
        <DataTable :value="[wallet]" rows="5" responsive>
          <template #header>
            <h5>Detalles de la Cartera</h5>
          </template>

          <Column field="name" header="Nombre" />
          <Column field="typeMoney" header="Tipo de Moneda" />
          <Column field="creationDate" header="Fecha de Creación" />
          <Column field="valorTotalRecibir" header="Valor Total a Recibir" />
          <Column field="tcea" header="TCEA" />
        </DataTable>


        <Button label="Add Document" @click="handleAddDocumentClick" />

        <Dialog v-model:visible="visible" maximizable modal header="Documentos Agregados" :style="{ width: '50rem' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <div v-if="documents.length">
            <div v-for="document in documents" :key="document.id">
              <div v-if="documentDetails[document.documentoId]">
                <DataTable
                    :value="[documentDetails[document.documentoId]]"
                    rows="10"
                    responsive
                    sortMode="single"
                >
                  <template #header>
                    <h5>Detalles del Documento</h5>
                  </template>

                  <Column
                      v-for="([key, value], index) in Object.entries(documentDetails[document.documentoId]).slice(1)"
                      :key="key"
                      :field="key"
                      :header="formatHeader(key)"
                  />
                </DataTable>

                <Button label="Añadir a la cartera" @click="agregarDocumento(wallet.id, document.documentoId)" />
              </div>
            </div>
          </div>
          <div v-else>
            <p>No se encontraron documentos.</p>
          </div>
        </Dialog>
      </div>
    </template>
  </Card>
</template>


<style scoped>
.wallet-item {
  margin-bottom: 1rem;
}
</style>
