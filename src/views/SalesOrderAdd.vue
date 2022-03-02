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
                <a-input-number
                  v-model:value="line.ProductId"
                  placeholder="000"
                  style="width: 60%; margin-right: 8px"
                />
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
          <a-button
            :style="{ float: 'right' }"
            type="primary"
            html-type="submit"
            @click="submitForm"
            >Save</a-button
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
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  setup() {
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

    const submitForm = () => {
      console.log("values", dynamicValidateForm.TransactionDate.unix());

    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const removeLine = (item) => {
      let index = dynamicValidateForm.lines.indexOf(item);

      if (index !== -1) {
        dynamicValidateForm.lines.splice(index, 1);
      }
    };

    const addLine = () => {
      dynamicValidateForm.lines.push({
        key: Date.now(),
        ProductId: null,
        Amount: null,
        Quantity: null,
      });
    };

    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeLine,
      addLine,
    };
  },

  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
});
</script>
