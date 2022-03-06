<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
    }"
  >
    <a-card
      title="Sales Order Details"
      :headStyle="{ backgroundColor: '#fafafa' }"
    >
      <a-form ref="formRef" :model="dynamicValidateForm">
        <a-card>
          <div class="header">
            <div>
              <a-form-item
                :name="['TransactionDate']"
                :label="['Transaction Date']"
                style="margin-right: 8px"
              >
                <a-date-picker
                  v-model:value="dynamicValidateForm.TransactionDate"
                  showToday
                />
              </a-form-item>
            </div>
            <div>
              <a-form-item :name="['DocNumber']" :label="['Document Number']">
                <a-input-number
                  v-model:value="dynamicValidateForm.DocNumber"
                  style="margin-right: 8px"
                  :min="1"
                />
              </a-form-item>
            </div>
            <div>
              <a-form-item :name="['Customer']" :label="['Customer']">
                <a-input
                  v-model:value="dynamicValidateForm.Customer"
                  style="margin-right: 8px"
                />
              </a-form-item>
            </div>
          </div>
        </a-card>

        <a-card :style="{ marginTop: '16px' }">
          <a-form-item
            v-for="(line, index) in dynamicValidateForm.lines"
            :key="line.key"
            v-bind="index === 0 ? formItemLayout : {}"
            :name="['lines', index, 'value']"
          >
            <div class="lineItems">
              <div>
                <a-typography-text>Quantity: </a-typography-text>
                <a-input-number
                  v-model:value="line.Quantity"
                  placeholder="00"
                  style="width: 60%; margin-right: 8px"
                  :min="0"
                />
              </div>
              <div>
                <a-typography-text>Product Id: </a-typography-text>
                <a-select
                  show-search
                  placeholder="Select a product"
                  option-filter-prop="data"
                  :filter-option="filterOption"
                  style="width: 12.5em; margin-right: 8px"
                  v-model:value="line.ProductId"
                  :loading="loading"
                  @dropdownVisibleChange="handleClick"
                >
                  <a-select-option v-for="d in data" :key="d.ProductId">
                    {{ d.ProductId }} - {{ d.ProductName }}
                  </a-select-option>
                </a-select>
              </div>
              <div>
                <a-typography-text>Line Amount: </a-typography-text>
                <a-input-number
                  v-model:value="line.Amount"
                  placeholder="0.00"
                  style="width: 60%; margin-right: 8px"
                  :min="0"
                  :step="0.01"
                />
              </div>
              <MinusCircleOutlined
                v-if="dynamicValidateForm.lines.length > 1"
                class="dynamic-delete-button"
                :disabled="dynamicValidateForm.lines.length === 1"
                @click="removeLine(line)"
              />
            </div>
          </a-form-item>

          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" style="width: 16%" @click="addLine">
              <PlusOutlined />
              Add Line
            </a-button>
          </a-form-item>
        </a-card>
        <a-card
          actions
          :style="{ marginTop: '16px', backgroundColor: '#fafafa' }"
        >
          <template v-if="isAuthenticated">
            <a-button
              :style="{ float: 'right' }"
              type="primary"
              html-type="submit"
              @click="submitForm"
              >Save</a-button
            ></template
          >
          <a-button :style="{ float: 'right' }" @click="$router.go(-1)"
            >Go Back</a-button
          >
        </a-card>
      </a-form>
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

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

.lineItems {
  display: inline-flex;
}

.header {
  display: flex;
}
</style>

<script>
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { reactive, ref, inject, computed } from "vue";
import { useStore } from "vuex";
import { ethers } from "ethers";

const formRef = ref();
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 0,
    },
  },
};
const dynamicValidateForm = reactive({
  DocNumber: null,
  TransactionDate: null,
  Customer: "",
  lines: [
    {
      key: Date.now(),
      ProductId: null,
      Amount: null,
      Quantity: null,
    },
  ],
});

const cleanedForm = reactive({
  DocNumber: null,
  TransactionDate: null,
  Customer: "",
  lines: [
    {
      key: Date.now(),
      ProductId: null,
      Amount: null,
      Quantity: null,
    },
  ],
});

export default {
  name: "SalesOrderAdd",
  data() {
    const store = useStore();
    const contractInvBlock = inject("contractInvBlock");

    return {
      data: [],
      loading: false,
      user: computed(() => store.state.user),
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      contractInvBlock,
      formItemLayout,
      formItemLayoutWithOutLabel,
      cleanedForm,
      dynamicValidateForm,
    };
  },
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  methods: {
    filterOption(input, option) {
      return (
        option.children[0].children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    async handleClick() {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const contractAddress =
            this.contractInvBlock.ProductFactory.contractAddress;
          const contractABI = this.contractInvBlock.ProductFactory.contractABI;
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
              ProductId: Number(productDetailTxn.ProductId),
              ProductName: productDetailTxn.ProductName,
              PartNumber: productDetailTxn.PartNumber,
            });
          }
          this.data = [...productsCleaned];
          this.loading = false;
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    submitForm() {
      console.log("values", dynamicValidateForm.TransactionDate.unix());

      let lineTotal = 0;
      for (const item of dynamicValidateForm.lines) {
        lineTotal = lineTotal + item.Amount;
        console.log(lineTotal);
      }
    },
    resetForm() {
      formRef.value.resetFields();
    },
    removeLine(item) {
      let index = dynamicValidateForm.lines.indexOf(item);

      if (index !== -1) {
        dynamicValidateForm.lines.splice(index, 1);
      }
    },
    addLine() {
      dynamicValidateForm.lines.push({
        key: Date.now(),
        ProductId: null,
        Amount: null,
        Quantity: null,
      });
    },
  },
};
</script>
