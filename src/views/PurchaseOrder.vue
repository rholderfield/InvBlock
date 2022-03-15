<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
    }"
  >
    <a-table
      sticky
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500 }"
    >
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
<style scoped>
#components-table-demo-summary tfoot th,
#components-table-demo-summary tfoot td {
  background: #fafafa;
}
[data-theme="dark"] #components-table-demo-summary tfoot th,
[data-theme="dark"] #components-table-demo-summary tfoot td {
  background: #1d1d1d;
}
</style>
<script>
import { inject, computed, ref } from "vue";
import { useStore } from "vuex";
import { ethers } from "ethers";
import moment from "moment";

const columns = ref([
  {
    title: "Document Number",
    width: "1.5em",
    dataIndex: "DocNumber",
    key: "DocNumber",
    fixed: "left",
  },
  {
    title: "Transaction Date",
    width: "2em",
    dataIndex: "TransactionDate",
    key: "TransactionDate",
  },
  {
    title: "Supplier Id",
    dataIndex: "SupplierId",
    key: "SupplierId",
    width: 100,
  },
  {
    title: "Action",
    key: "operation",
    dataIndex: "operation",
    fixed: "right",
    width: 25,
  },
]);

export default {
  name: "PurchaseOrder",
  data() {
    const store = useStore();

    return {
      data: [],
      dataLine: [],
      loading: false,
      columns,
      user: computed(() => store.state.user),
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      counter: 0,
    };
  },
  mounted() {
    this.getPurchaseOrderByOwner().then(this.getPurchaseOrderLineByOwner());
  },
  methods: {
    async getPurchaseOrderByOwner() {
      try {
        const { ethereum } = window;
        const contractInvBlock = inject("contractInvBlock");
        const PurchaseOrderHeaderFactoryContractAddress =
          contractInvBlock.PurchaseOrderHeaderFactory.contractAddress;
        const PurchaseOrderHeaderFactoryContractABI =
          contractInvBlock.PurchaseOrderHeaderFactory.contractABI;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const PurchaseOrderHeaderFactoryContract = new ethers.Contract(
            PurchaseOrderHeaderFactoryContractAddress,
            PurchaseOrderHeaderFactoryContractABI,
            signer
          );

          this.loading = true;

          const PurchaseOrderTxn =
            await PurchaseOrderHeaderFactoryContract.getPurchaseOrderHeaderByOwner(
              this.user.get("ethAddress")
            );

          let PurchaseOrderTxnCleaned = [];

          for (let value of PurchaseOrderTxn) {
            const PurchaseOrderDetailTxn =
              await PurchaseOrderHeaderFactoryContract.purchaseOrderHeaders(
                PurchaseOrderTxn[value]
              );

            PurchaseOrderTxnCleaned.push({
              key: this.counter,
              DocNumber: Number(PurchaseOrderDetailTxn.DocNumber),
              TransactionDate: moment
                .unix(Number(PurchaseOrderDetailTxn.TransactionDate))
                .format("DD MMM YYYY, h:mm:ss a"),
              SupplierId: Number(PurchaseOrderDetailTxn.SupplierId),
            });
            this.counter++;
          }
          this.data = [...PurchaseOrderTxnCleaned];
          this.loading = false;
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getPurchaseOrderLineByOwner() {
      try {
        const { ethereum } = window;
        const contractInvBlock = inject("contractInvBlock");
        const PurchaseOrderHeaderFactoryContractAddress =
          contractInvBlock.PurchaseOrderHeaderFactory.contractAddress;
        const PurchaseOrderHeaderFactoryContractABI =
          contractInvBlock.PurchaseOrderHeaderFactory.contractABI;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const PurchaseOrderHeaderFactoryContract = new ethers.Contract(
            PurchaseOrderHeaderFactoryContractAddress,
            PurchaseOrderHeaderFactoryContractABI,
            signer
          );

          const purchaseOrderLineByOwner =
            await PurchaseOrderHeaderFactoryContract.getPurchaseOrderLineByOwner(
              this.user.get("ethAddress")
            );

          let PurchaseOrderLineTxnCleaned = [];

          for (let line of purchaseOrderLineByOwner) {
            const SalesOrderLineDetailTxn =
              await PurchaseOrderHeaderFactoryContract.purchaseOrderLines(
                purchaseOrderLineByOwner[line]
              );

            PurchaseOrderLineTxnCleaned.push({
              DocNumber: Number(SalesOrderLineDetailTxn.DocNumber),
              LineNo: Number(SalesOrderLineDetailTxn.LineNo),
              ProductId: Number(SalesOrderLineDetailTxn.ProductId),
              Quantity: Number(SalesOrderLineDetailTxn.Quantity),
              Amount: Number(SalesOrderLineDetailTxn.Amount),
            });
          }
          this.dataLine = [...PurchaseOrderLineTxnCleaned];
          console.log(JSON.stringify(this.dataLine));
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
