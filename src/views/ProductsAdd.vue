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
      title="Product Details"
    >
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        @finish="onFinish"
      >
        <a-form-item
          :name="['product', 'ProductId']"
          :label="['Product Id']"
          :rules="[
            { required: true, type: 'number', min: 0, max: 100000000000 },
          ]"
        >
          <a-input-number v-model:value="formState.product.ProductId" />
        </a-form-item>
        <a-form-item
          :name="['product', 'ProductName']"
          label="Product Name"
          :rules="[
            { type: 'string', min: 0, max: 300, message: 'Exceeds length' },
          ]"
        >
          <a-input v-model:value="formState.product.ProductName" />
        </a-form-item>
        <a-form-item
          :name="['product', 'PartNumber']"
          label="Product Number"
          :rules="[
            { type: 'string', min: 0, max: 300, message: 'Exceeds length' },
          ]"
        >
          <a-input v-model:value="formState.product.PartNumber" />
        </a-form-item>
        <a-form-item
          label="Product Description"
          :rules="[
            { type: 'string', min: 0, max: 2000, message: 'Exceeds length' },
          ]"
        >
          <a-input v-model:value="formState.product.ProductDescription" />
        </a-form-item>
      </a-form>
      <a-card actions :style="{ backgroundColor: '#fafafa' }">
        <template v-if="isAuthenticated">
          <a-button
            :style="{ float: 'right' }"
            type="primary"
            html-type="submit"
            @click="print"
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

export default {
  name: "ProductsAdd",
  setup() {
    const store = useStore();
    const contractInvBlock = inject("contractInvBlock");
    const contract = contractInvBlock.ProductFactory;

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const formState = reactive({
      product: {
        ProductId: undefined,
        ProductName: "",
        PartNumber: "",
        ProductDescription: "",
      },
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const print = () => {
      console.log(formState, contract);
    };

    return {
      formState,
      onFinish,
      layout,
      print,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
    };
  },
};
</script>
