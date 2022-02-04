<template>
  <div
    :style="{
      background: '#fff',
      padding: '0 48px',
    }"
  >
    <a-calendar v-model:value="value" />
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