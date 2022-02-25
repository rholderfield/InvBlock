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
    title: "Product Id",
    width: 20,
    dataIndex: "ProductId",
    key: "ProductId",
    fixed: "left",
  },
  {
    title: "Product Name",
    width: 50,
    dataIndex: "ProductName",
    key: "ProductName",
  },
  {
    title: "Part Number",
    dataIndex: "PartNumber",
    key: "PartNumber",
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
  name: "Products",
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
    this.getProductsByOwner();
  },
  methods: {
    async getProductsByOwner() {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const contractInvBlock = inject("contractInvBlock");
          const contractAddress =
            contractInvBlock.ProductFactory.contractAddress;
          const contractABI = contractInvBlock.ProductFactory.contractABI;
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const ProductFactoryContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          this.loading = true;
          const productTxn = await ProductFactoryContract.getProductByOwner(
            this.user.get("ethAddress")
          );

          let productsCleaned = [];

          for (let value of productTxn) {
            const productDetailTxn = await ProductFactoryContract.products(
              productTxn[value]
            );
            productsCleaned.push({
              key: this.counter,
              ProductId: Number(productDetailTxn.ProductId),
              ProductName: productDetailTxn.ProductName,
              PartNumber: productDetailTxn.PartNumber,
            });
            this.counter++;
          }
          this.data = [...productsCleaned]
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
