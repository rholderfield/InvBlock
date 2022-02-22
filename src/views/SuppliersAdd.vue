<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
    }"
  >
    <a-card
      :style="{ width: '600px' }"
      :headStyle="{ backgroundColor: '#fafafa' }"
      title="Supplier Details"
    >
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
        id="Supplier"
      >
        <a-form-item
          :name="['supplier', 'SupplierId']"
          label="Supplier Id"
          :rules="[
            { required: true, type: 'number', min: 0, max: 100000000000 },
          ]"
        >
          <a-input-number v-model:value="formState.supplier.SupplierId" />
        </a-form-item>
        <a-form-item
          :name="['supplier', 'SupplierName']"
          label="Supplier Name"
          :rules="[
            { type: 'string', min: 0, max: 800, message: 'Exceeds length' },
          ]"
        >
          <a-input v-model:value="formState.supplier.SupplierName" />
        </a-form-item>
        <a-form-item
          :name="['supplier', 'SupplierPhone']"
          label="Supplier Phone"
          :rules="[
            { type: 'string', min: 0, max: 20, message: 'Exceeds length' },
          ]"
        >
          <a-input v-model:value="formState.supplier.SupplierPhone" />
        </a-form-item>
      </a-form>
      <a-card actions :style="{ backgroundColor: '#fafafa' }">
        <template v-if="isAuthenticated">
          <a-button
            :style="{ float: 'right' }"
            type="primary"
            html-type="submit"
            @click="save"
            >Save</a-button
          >
        </template>
        <a-button :style="{ float: 'right' }" @click="$router.go(-1)"
          >Go Back</a-button
        >
      </a-card>
    </a-card>
  </div>
</template>
<style scoped>
button.ant-btn {
  margin: 0 8px;
  color: #05182a;
}

form.ant-form.ant-form-horizontal {
  text-align: left;
}
</style>
<script>
import { inject, reactive, computed } from "vue";
import { useStore } from "vuex";
import { ethers } from "ethers";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

export default {
  name: "SuppliersAdd",
  setup() {
    const store = useStore();
    const contractInvBlock = inject("contractInvBlock");
    const contractAddress = contractInvBlock.SupplierFactory.contractAddress;
    const contractABI = contractInvBlock.SupplierFactory.contractABI;

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };
    const formState = reactive({
      supplier: {
        SupplierId: undefined,
        SupplierName: "",
        SupplierPhone: "",
      },
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const save = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const SupplierFactoryContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          const productTxn = await SupplierFactoryContract.createSupplier(
            formState.supplier.SupplierId,
            formState.supplier.SupplierName,
            formState.supplier.SupplierPhone
          );
          console.log("Mining...", productTxn.hash);
          Nprogress.start();
          await productTxn.wait();
          Nprogress.done();
          console.log("Mined -- ", productTxn.hash);
          document.getElementById("Supplier").reset();
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      formState,
      onFinish,
      layout,
      validateMessages,
      save,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
    };
  },
};
</script>
