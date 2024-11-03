<script>
import InvoiceItem from "../../components/invoice/InvoiceItem.vue";
import CostsAndExpensesInformation from "../../components/costsAndExpenses/costsAndExpensesInformation.vue";
import InvoiceInformation from "../../components/invoice/InvoiceInformation.vue";
import RateAndTermInformation from "../../components/RateAndTerm/RateAndTermInformation.vue";
import QueryResults from "../../components/results/QueryResults.vue";
import MainMenu from "../../components/MainMenu.vue";

export default {
  name: 'DocumentInvoice',
  components: {
    MainMenu,
    QueryResults,
    InvoiceInformation,
    RateAndTermInformation,
    CostsAndExpensesInformation
  },
  methods: {
    async submitAll() {
      try {
        await this.$refs.invoiceInfo.submitInvoice();
        await this.$refs.rateAndTermInfo.submitRateAndTerm();
        await this.$refs.costsAndExpensesInfo.submitCostsAndExpenses();
        alert('All submissions successful');
      } catch (error) {
        console.error('Error submitting forms:', error);
        alert('Error submitting forms');
      }
    }
  }
};
</script>


  <template id="app">

    <div class="p-grid p-nogutter equal-height">
      <div class="p-col-12 p-md-4">
        <!-- Rate And Term Information -->
        <RateAndTermInformation ref="rateAndTermInfo" />
      </div>
      <div class="p-col-12 p-md-4">
        <!-- Invoice Information -->
        <InvoiceInformation ref="invoiceInfo" />
      </div>

    </div>
    <div class="p-grid p-nogutter">
      <div class="p-col-12">
        <!-- Costs And Expenses Information -->
        <CostsAndExpensesInformation ref="costsAndExpensesInfo" />
      </div>
    </div>
    <Button @click="submitAll" label="Agregar factura" class="submit-button" />
    <div class="p-grid p-nogutter">
      <div class="p-col-12">
        <QueryResults/>
      </div>
    </div>
  </template>



<style>
.p-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}

.p-nogutter {
  margin-right: 0;
  margin-left: 0;
}

.p-col-12 {
  flex: 1 1 100%;
  box-sizing: border-box;
}

.p-col-12.p-md-4 {
  flex: 1 1 33.3333%;
  display: flex;
  flex-direction: column;
}

.equal-height {
  display: flex;
}

.equal-height > .p-col-12.p-md-4 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.equal-height > .p-col-12.p-md-4 > * {
  flex-grow: 1;
}

.submit-button {
  display: block;
  margin: 20px auto;
}

</style>