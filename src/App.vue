<template>
  <a-layout>
    <!-- header -->
    <a-layout-header :style="{ height: 'auto', background: 'none', padding: '0px' }">
      <div id="nav">
        <a-menu
        v-model:selectedKeys="current"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"><router-link to="/">Home</router-link></a-menu-item>
        <a-menu-item key="2"><router-link to="/salesorder">Sales Order</router-link></a-menu-item>
        <a-menu-item key="3"><router-link to="/purchaseorder">Purchase Order</router-link></a-menu-item>
        <a-menu-item key="4"><router-link to="/products">Products</router-link></a-menu-item>
        <a-menu-item key="5"><router-link to="/suppliers">Suppliers</router-link></a-menu-item>
        <a-menu-item key="6"><ConnectButton /></a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>
    <!-- header -->
    
    <!-- body -->
    <a-layout-content :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
    <router-view />
    </a-layout-content>
    <!-- body -->

  </a-layout>
</template>

<script>
// @ is an alias to /src
import ConnectButton from "@/components/ConnectButton.vue";
import { ref } from 'vue';

export default {
  name: "App",
components: {
  ConnectButton
  },
    setup() {
    const current = ref(['1']);
    return {
      current,
    };
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav a {
  font-weight: bold;
}
</style>
