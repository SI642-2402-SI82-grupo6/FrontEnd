<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService.js';
import WalletItem from "./WalletItem.vue";

const wallets = ref([]);
const selectedWallet = ref(null);
const showWalletItem = ref(false);
const router = useRouter();

const fetchWallets = () => {
  FinanceDataService.obtenerCarteras()
      .then(response => {
        wallets.value = response.data.map(wallet => ({
          data: wallet,
          children: [] // Dejar vacío si no hay subniveles
        }));
        console.log('Wallets:', wallets.value);
      })
      .catch(error => {
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

onMounted(fetchWallets);
</script>

<template>
  <div>
    <h2>Wallet List</h2>
    <TreeTable :value="wallets" v-if="wallets.length">
      <Column field="name" header="Nombre"></Column>

      <Column header="Actions">
        <template #body="slotProps">
          <Button @click="deleteWallet(slotProps.node.data.id)" label="Delete"/>
          <Button @click="viewWalletResult(slotProps.node.data.id)" label="View Result"/>
          <Button @click="showWalletDetails(slotProps.node.data)" label="Show Details"/>
        </template>
      </Column>
    </TreeTable>

    <div v-else>
      <ProgressSpinner />
    </div>

    <Dialog v-model:visible="showWalletItem" modal header="Wallet Details">
      <WalletItem v-if="selectedWallet" :wallet="selectedWallet"/>
    </Dialog>
  </div>
</template>