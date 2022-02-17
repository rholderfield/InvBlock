<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
    }"
  >
    <a-card title="Purchase Order Details" :headStyle="{backgroundColor: '#fafafa'}">
      <a-card> Order Details </a-card>
      <a-card :style="{ marginTop: '16px' }"> Line Details </a-card>
      <a-card actions :style="{ marginTop: '16px', backgroundColor: '#fafafa' }">
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
  color: #05182A;

}

form.ant-form.ant-form-horizontal {
  text-align: left;
}
</style>

<script>

export default {
  name: "PurchaseOrderAdd",
  components: {},
  setup() {
    const print = () => { console.log("Clicked")}

    return {
      print,
    };
  },
};
</script>