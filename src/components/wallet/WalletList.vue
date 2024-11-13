<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService.js';
import WalletItem from "./WalletItem.vue";

const wallets = ref([]);
const selectedWallet = ref(null);
const isLoading = ref(true);
const showWalletItem = ref(false);
const timeoutReached = ref(false);
const router = useRouter();

const fetchWallets = () => {
  isLoading.value = true;
  timeoutReached.value = false;

  // Inicia un temporizador de 10 segundos para mostrar el mensaje en caso de demora
  const timeout = setTimeout(() => {
    timeoutReached.value = true;
    isLoading.value = false;
  }, 100);

  FinanceDataService.obtenerCarteras()
      .then(response => {
        // Limpiar el temporizador si los datos se reciben antes de 10 segundos
        clearTimeout(timeout);
        isLoading.value = false;

        wallets.value = response.data.length ? response.data.map(wallet => ({
          data: wallet,
          children: [] // Dejar vacío si no hay subniveles
        })) : [];

        if (wallets.value.length === 0) {
          timeoutReached.value = true;  // Activa el mensaje si no hay datos
        }
        console.log('Wallets:', wallets.value);
      })
      .catch(error => {
        clearTimeout(timeout);
        isLoading.value = false;
        timeoutReached.value = true; // Activa el mensaje en caso de error
        console.error('Error fetching wallets:', error);
      });
};

const deleteWallet = (id) => {
  FinanceDataService.eliminarCartera(id)
      .then(() => {
        fetchWallets(); // Refresh the wallet list after deletion
      })
      .catch(error => {
        console.error('Error deleting wallet:', error);
      });
};

const viewWalletResult = (id) => {
  router.push({name: 'WalletResult', params: {id: id}});
};

const showWalletDetails = (wallet) => {
  selectedWallet.value = wallet;
  showWalletItem.value = true;
};
const onWalletCreated = () => {
  fetchWallets();
};
defineExpose({
  onWalletCreated,

});
onMounted(fetchWallets);
</script>

<template >
  <div>
    <h2>Wallet List</h2>
    <TreeTable :value="wallets" v-if="wallets.length  ">
      <Column field="name" header="Nombre"></Column>

      <Column header="Actions">
        <template #body="slotProps">
          <Button @click="deleteWallet(slotProps.node.data.id)" label="Delete" />
          <Button @click="viewWalletResult(slotProps.node.data.id)" label="View Result" />
          <Button @click="showWalletDetails(slotProps.node.data)" label="Show Details" />
        </template>
      </Column>
    </TreeTable>

    <div v-else>
      <div v-if="timeoutReached">No se ha encontrado ninguna cartera.</div>
      <div v-else>
        <ProgressSpinner />
      </div>
    </div>

    <Dialog v-model:visible="showWalletItem" modal header="Wallet Details">
      <WalletItem v-if="selectedWallet" :wallet="selectedWallet" />
    </Dialog>
  </div>

</template>
