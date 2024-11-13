<script setup>
import WalletList from '../../components/wallet/WalletList.vue';
import WalletCreate from '../../components/wallet/WalletCreate.vue';
import { ref } from "vue";
import { useRouter } from "vue-router";


const showCreateForm = ref(false);
const router = useRouter();

const toggleCreateForm = () => {
  showCreateForm.value = !showCreateForm.value;
};

// Definir las opciones del menú
const menuItems = [
  {
    label: 'Opciones de Creación',
    items: [
      {
        label: 'Create Invoice',
        command: () => router.push('/invoice-information')
      },
      {
        label: 'Create Letter',
        command: () => router.push('/letter-information')
      },
      {
        label: 'Create Wallet',
        command: toggleCreateForm
      }
    ]
  }
];
</script>

<template>
  <div>
    <!-- PanelMenu para organizar los botones -->
    <PanelMenu :model="menuItems" style="width: 300px" />

    <!-- Mostrar el formulario para crear la Wallet como un Dialog -->
    <Dialog
        v-model:visible="showCreateForm"
        header="Crear Nueva Cartera"
        :closable="true"
        :style="{ width: '50vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <!-- Aquí se renderiza el componente WalletCreate dentro del diálogo -->
      <WalletCreate />
    </Dialog>

    <!-- Lista de Wallets -->
    <WalletList />
  </div>
</template>

<style scoped>
.p-field {
  margin-bottom: 1rem;
}
</style>
