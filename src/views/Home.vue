<template>
  <div
    :style="{
      background: '#fff',
      padding: '8px 8px',
      display: 'flex',
      gap: '8px'
    }"
  >
    <div
      :style="{
        width: '300px',
        border: '1px solid #d9d9d9',
        borderRadius: '1px',
        padding: '8px'
      }"
    >
      <a-card>
        <a-statistic
          title="Total Products"
          :value="112893"
        />
        <br />
        <a-statistic
          title="Total Suppliers"
          :value="112893"
        />
      </a-card>
    </div>

    <div
      :style="{
        width: '300px',
        border: '1px solid #d9d9d9',
        borderRadius: '1px',
      }"
    >
      <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Home",
  components: {},
  setup() {
    const value = ref();
    return {
      value,
    };
  },
};
</script>