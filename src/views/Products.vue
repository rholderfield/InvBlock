<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
    }"
  >
    <a-table sticky :columns="columns" :data-source=data :scroll="{ x: 800 }">
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
import { inject, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { ethers } from "ethers";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

export default {
  name: "Products",
  setup() {
    const store = useStore();
    const $moralis = inject("$moralis");
    const contractInvBlock = inject("contractInvBlock");
    const contractAddress = contractInvBlock.ProductFactory.contractAddress;
    const contractABI = contractInvBlock.ProductFactory.contractABI;
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
    const data = [];

    for (let i = 0; i < 6; i++) {
      data.push({
        key: i,
        ProductId: `${i}`,
        ProductName: `Product ${i}`,
        PartNumber: `Part no. ${i}`,
      });
    }

    async function getProductsByOwner() {

        const user = $moralis.User.current();
        try {
          const { ethereum } = window;
          

          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const ProductFactoryContract = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );

            Nprogress.start();
            const productTxn = await ProductFactoryContract.getProductByOwner(
              user.get("ethAddress")
            );
            Nprogress.done();
            console.log(productTxn, data);

            Nprogress.start();
            const productDetailTxn = await ProductFactoryContract.products(
              productTxn[2]
            );
            Nprogress.done();
            console.log(productDetailTxn);
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error);
        }
      }

    onMounted(() => {
      getProductsByOwner();
    });

    return {
      data,
      columns,
      user: computed(() => store.state.user),
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
    };
  },
};
</script>
