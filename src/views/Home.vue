<template>
  <div class="home" :style="{
          background: '#fff',
          padding: '0 96px',

        }">
    <a-calendar v-model:value="value" @panelChange="onPanelChange" />
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Home',
  components: {
  },
  setup() {
    const value = ref();
    return {
      value,
    };
  },

}
</script>