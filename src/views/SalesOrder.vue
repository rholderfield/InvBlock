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
    title: "Customer",
    dataIndex: "Customer",
    key: "Customer",
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
  name: "SalesOrder",
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
    this.getSalesOrderByOwner().then(this.getSalesOrderLineByOwner());
  },
  methods: {
    async getSalesOrderByOwner() {
      try {
        const { ethereum } = window;
        const contractInvBlock = inject("contractInvBlock");
        const SalesOrderHeaderFactoryContractAddress =
          contractInvBlock.SalesOrderHeaderFactory.contractAddress;
        const SalesOrderHeaderFactoryContractABI =
          contractInvBlock.SalesOrderHeaderFactory.contractABI;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const SalesOrderHeaderFactoryContract = new ethers.Contract(
            SalesOrderHeaderFactoryContractAddress,
            SalesOrderHeaderFactoryContractABI,
            signer
          );

          this.loading = true;

          const SalesOrderTxn =
            await SalesOrderHeaderFactoryContract.getSalesOrderHeaderByOwner(
              this.user.get("ethAddress")
            );

          let SalesOrderTxnCleaned = [];

          for (let value of SalesOrderTxn) {
            const SalesOrderDetailTxn =
              await SalesOrderHeaderFactoryContract.salesOrderHeaders(
                SalesOrderTxn[value]
              );

            SalesOrderTxnCleaned.push({
              key: this.counter,
              DocNumber: Number(SalesOrderDetailTxn.DocNumber),
              TransactionDate: moment
                .unix(Number(SalesOrderDetailTxn.TransactionDate))
                .format("DD MMM YYYY, h:mm:ss a"),
              Customer: SalesOrderDetailTxn.Customer,
            });
            this.counter++;
          }
          this.data = [...SalesOrderTxnCleaned];
          this.loading = false;
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getSalesOrderLineByOwner() {
      try {
        const { ethereum } = window;
        const contractInvBlock = inject("contractInvBlock");
        const SalesOrderHeaderFactoryContractAddress =
          contractInvBlock.SalesOrderHeaderFactory.contractAddress;
        const SalesOrderHeaderFactoryContractABI =
          contractInvBlock.SalesOrderHeaderFactory.contractABI;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const SalesOrderHeaderFactoryContract = new ethers.Contract(
            SalesOrderHeaderFactoryContractAddress,
            SalesOrderHeaderFactoryContractABI,
            signer
          );

          const salesOrderLineByOwner =
            await SalesOrderHeaderFactoryContract.getSalesOrderLineByOwner(
              this.user.get("ethAddress")
            );
          console.log(salesOrderLineByOwner);
          let SalesOrderLineTxnCleaned = [];

          for (let i of salesOrderLineByOwner) {
            const SalesOrderLineDetailTxn =
              await SalesOrderHeaderFactoryContract.salesOrderLines(
                salesOrderLineByOwner[i]
              );

            SalesOrderLineTxnCleaned.push({
              DocNumber: Number(SalesOrderLineDetailTxn.DocNumber),
              LineNo: Number(SalesOrderLineDetailTxn.LineNo),
              ProductId: Number(SalesOrderLineDetailTxn.ProductId),
              Quantity: Number(SalesOrderLineDetailTxn.Quantity),
              Amount: Number(SalesOrderLineDetailTxn.Amount),
            });
          }
          this.dataLine = [...SalesOrderLineTxnCleaned];
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
