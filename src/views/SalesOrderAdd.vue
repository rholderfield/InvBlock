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
      <a-card> Order Details </a-card>

      <a-card :style="{ marginTop: '16px' }">
        <a-form
          ref="formRef"
          :model="dynamicValidateForm"
          v-bind="formItemLayoutWithOutLabel"
        >
          <a-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            v-bind="index === 0 ? formItemLayout : {}"
            :label="index === 0 ? 'Line Details' : ''"
            :name="['domains', index, 'value']"
            >
            <div class="listItems">
            <div>
              <a-typography-text>Line Amount </a-typography-text>
              <a-input-number
                v-model:value="domain.Amount"
                placeholder="0.00"
                style="width: 60%; margin-right: 8px"
              />
            </div>
            <div>
              <a-typography-text>Product Id </a-typography-text>
              <a-input-number
                v-model:value="domain.ProductId"
                placeholder="000"
                style="width: 60%; margin-right: 8px"
              />
            </div>
            <div>
              <a-typography-text>Quantity </a-typography-text>
              <a-input-number
                v-model:value="domain.Quantity"
                placeholder="00"
                style="width: 60%; margin-right: 8px"
              />
            </div>
            <MinusCircleOutlined
              v-if="dynamicValidateForm.domains.length > 1"
              class="dynamic-delete-button"
              :disabled="dynamicValidateForm.domains.length === 1"
              @click="removeDomain(domain)"
            />
            
            </div>
            </a-form-item>

          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" style="width: 10%" @click="addDomain">
              <PlusOutlined />
              Add Line
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card
        actions
        :style="{ marginTop: '16px', backgroundColor: '#fafafa' }"
      >
        <a-button
          :style="{ float: 'right' }"
          type="primary"
          html-type="submit"
          @click="print"
          >Save</a-button
        >
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

.listItems {
  display:inline-flex;
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
          offset: 4,
        },
      },
    };
    const dynamicValidateForm = reactive({
      domains: [],
    });

    dynamicValidateForm.domains.push({
      key: Date.now(),
      ProductId: null,
      Amount: null,
      Quantity: null
    });

    const submitForm = () => {

          console.log("values", dynamicValidateForm.domains);


    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const removeDomain = (item) => {
      let index = dynamicValidateForm.domains.indexOf(item);

      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };

    const addDomain = () => {
      dynamicValidateForm.domains.push({
      key: Date.now(),
      ProductId: null,
      Amount: null,
      Quantity: null
      });
    };

    return {
      formRef,
      formItemLayout,
      formItemLayoutWithOutLabel,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeDomain,
      addDomain,
    };
  },

  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
});
</script>
