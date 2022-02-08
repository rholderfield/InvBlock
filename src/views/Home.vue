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
      <a-calendar :fullscreen="false"/>
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
        <a-statistic title="Total Products" :value="112893" />
        <br />
        <a-statistic title="Total Suppliers" :value="112893" />
      </a-card>
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