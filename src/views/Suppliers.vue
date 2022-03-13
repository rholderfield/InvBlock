<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
    }"
  >
    <a-table sticky :columns="columns" :data-source="data" :loading="loading" :scroll="{ x: 800 }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'"><a>action</a></template>
      </template>
      <template #summary>
        <a-table-summary>
          <a-table-summary-row>
            <a-table-summary-cell :index="0" :col-span="2"
              >Fix Left</a-table-summary-cell
            >
            <a-table-summary-cell :index="2" :col-span="8"
              >Scroll Context</a-table-summary-cell
            >
            <a-table-summary-cell :index="10">Fix Right</a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </div>
</template>
<script>
import { inject, computed, ref } from "vue";
import { useStore } from "vuex";
import { ethers } from "ethers";

    const columns = ref([
      {
        title: "Supplier Id",
        width: 20,
        dataIndex: "SupplierId",
        key: "SupplierId",
        fixed: "left",
      },
      {
        title: "Supplier Name",
        width: 20,
        dataIndex: "SupplierName",
        key: "SupplierName",
      },
      {
        title: "Supplier Phone",
        dataIndex: "SupplierPhone",
        key: "SupplierPhone",
        width: 50,
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 20,
      },
    ]);

export default {
  name: "Suppliers",
  data() {
    const store = useStore();

    return {
      data: [],
      loading: false,
      columns,
      user: computed(() => store.state.user),
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      counter: 0
    };
  },
  mounted() {
    this.getSuppliersByOwner();
  },
  methods: {
    async getSuppliersByOwner() {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const contractInvBlock = inject("contractInvBlock");
          const contractAddress =
            contractInvBlock.SupplierFactory.contractAddress;
          const contractABI = contractInvBlock.SupplierFactory.contractABI;
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const SupplierFactoryContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          this.loading = true;
          const supplierTxn = await SupplierFactoryContract.getSupplierByOwner(
            this.user.get("ethAddress")
          );

          let suppliersCleaned = [];

          for (let value of supplierTxn) {
            const suppliertDetailTxn = await SupplierFactoryContract.suppliers(
              supplierTxn[value]
            );
            suppliersCleaned.push({
              key: this.counter,
              SupplierId: Number(suppliertDetailTxn.SupplierId),
              SupplierName: suppliertDetailTxn.SupplierName,
              SupplierPhone: suppliertDetailTxn.SupplierPhone,
            });
            this.counter++;
          }
          this.data = [...suppliersCleaned]
          this.loading = false;
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

</script>
