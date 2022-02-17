<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
    }"
  >
    <a-card :style="{width: '600px'}" :headStyle="{backgroundColor: '#fafafa'}" title="Supplier Details">
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
      > 
        <a-form-item
          :name="['user', 'name']"
          label="Name"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="formState.user.name" />
        </a-form-item>
        <a-form-item
          :name="['user', 'email']"
          label="Email"
          :rules="[{ type: 'email' }]"
        >
          <a-input v-model:value="formState.user.email" />
        </a-form-item>
        <a-form-item
          :name="['user', 'age']"
          label="Age"
          :rules="[{ type: 'number', min: 0, max: 99 }]"
        >
          <a-input-number v-model:value="formState.user.age" />
        </a-form-item>
        <a-form-item :name="['user', 'website']" label="Website">
          <a-input v-model:value="formState.user.website" />
        </a-form-item>
        <a-form-item :name="['user', 'introduction']" label="Introduction">
          <a-textarea v-model:value="formState.user.introduction" />
        </a-form-item>
      </a-form>
      <a-card actions :style="{ backgroundColor: '#fafafa'}">
        <a-button :style="{ float: 'right' }" type="primary" html-type="submit" @click="print"
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
  color: #05182A;

}

form.ant-form.ant-form-horizontal {
  text-align: left;
}
</style>
<script>
import { reactive } from "vue";
export default {
  name: "ProductsAdd",
  setup() {
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
      user: {
        name: "",
        age: undefined,
        email: "",
        website: "",
        introduction: "",
      },
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const print = () => {
      console.log(formState);
    }

    return {
      formState,
      onFinish,
      layout,
      validateMessages,
      print
    };
  },
};
</script>
