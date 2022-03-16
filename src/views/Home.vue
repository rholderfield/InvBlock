<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
      display: 'flex',
      gap: '8px',
    }"
  >
    <div
      :style="{
        width: '300px',
        border: '1px solid #f0f0f0',
        borderRadius: '1px',
      }"
    >
      <a-calendar :fullscreen="false" />
    </div>

    <div
      :style="{
        width: '300px',
        border: '1px solid',
        borderRadius: '1px',
        padding: '8px',
        display: 'contents',
      }"
    >
      <a-card>
        <a-statistic title="Total Products" :value="productCount" />
        <br />
        <a-statistic title="Total Suppliers" :value="supplierCount" />
      </a-card>
    </div>
  </div>
</template>

<script>
import { inject, computed } from "vue";
import { useStore } from "vuex";
import { ethers } from "ethers";

export default {
  name: "Home",
  data() {
    const store = useStore();

    return {
      productCount: 0,
      supplierCount: 0,
      user: computed(() => store.state.user),
    };
  },
  mounted() {
    this.getProductAndSupplierCount();
  },
  methods: {
    async getProductAndSupplierCount() {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const contractInvBlock = inject("contractInvBlock");

          const contractProductAddress =
            contractInvBlock.ProductFactory.contractAddress;
          const contractProductABI =
            contractInvBlock.ProductFactory.contractABI;

          const contractSupplierAddress =
            contractInvBlock.SupplierFactory.contractAddress;
          const contractSupplierABI =
            contractInvBlock.SupplierFactory.contractABI;

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();

          const ProductFactoryContract = new ethers.Contract(
            contractProductAddress,
            contractProductABI,
            signer
          );

          const SupplierFactoryContract = new ethers.Contract(
            contractSupplierAddress,
            contractSupplierABI,
            signer
          );

          const productCountData =
            await ProductFactoryContract.getProductByOwnerCount();

          const supplierCountData =
            await SupplierFactoryContract.getSupplierByOwnerCount();

          this.productCount = Number(productCountData);
          this.supplierCount = Number(supplierCountData);
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
