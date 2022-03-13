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
    width: '1.5em',
    dataIndex: "DocNumber",
    key: "DocNumber",
    fixed: "left",
  },
  {
    title: "Transaction Date",
    width: '2em',
    dataIndex: "TransactionDate",
    key: "TransactionDate"
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
      loading: false,
      columns,
      user: computed(() => store.state.user),
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      counter: 0,
    };
  },
  mounted() {
    this.getSalesOrderByOwner();
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
              console.log(JSON.stringify(SalesOrderDetailTxn));
            SalesOrderTxnCleaned.push({
              key: this.counter,
              DocNumber: Number(SalesOrderDetailTxn.DocNumber),
              TransactionDate: moment
                .unix(Number(SalesOrderDetailTxn.TransactionDate))
                .format("DD MMM YYYY, h:mm:ss a"),
              Customer: SalesOrderDetailTxn.Customer,
              operation: "hi"
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
  },
};
</script>
