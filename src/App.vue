<template>
  <a-layout>
    <!-- header -->
    <a-layout-header
      :style="{ height: 'auto', background: 'none', padding: '0px' }"
    >
      <div id="nav">
        <div :style="{ float: 'left', paddingLeft: '8px', backgroundColor: '#FFFFFF' }">
        <img alt="logo" width="32" src="./assets/pixlogo.png">
        <a-divider type="vertical" />
        </div>
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1"
            ><router-link to="/"
              ><home-outlined /> | Home</router-link
            ></a-menu-item
          >
          <a-menu-item key="2"
            ><router-link to="/salesorder"
              ><container-outlined /> Sales Order</router-link
            ></a-menu-item
          >
          <a-menu-item key="3"
            ><router-link to="/purchaseorder"
              ><wallet-outlined /> Purchase Order</router-link
            ></a-menu-item
          >
          <a-menu-item key="4"
            ><router-link to="/products"
              ><tag-outlined /> Products</router-link
            ></a-menu-item
          >
          <a-menu-item key="5"
            ><router-link to="/suppliers"
              ><user-outlined /> Suppliers</router-link
            ></a-menu-item
          >
          <li :style="{ marginLeft: 'auto', order: '6', paddingRight: '8px' }">
            <ConnectButton />
          </li>
        </a-menu>
      </div>
    </a-layout-header>
    <!-- header -->

    <!-- body -->
    <a-layout>
      <a-layout-content
        :style="{
          background: '#fff',
          padding: '0 24px',
          minHeight: 'calc(100vh - 70px)',
        }"
      >
        <router-view />
      </a-layout-content>
      <a-layout-sider
        collapsible
        :reverseArrow="true"
        theme="light"
        :style="{ border: 'box' }"
      >
        <div class="logo" />
        <br />
        <a-menu mode="inline">
          <a-menu-item key="1">
            <container-outlined />
            <span>Add Sales Order</span>
          </a-menu-item>
          <a-menu-item key="2">
            <wallet-outlined />
            <span>Add Purchase Order</span>
          </a-menu-item>
          <a-menu-item key="3">
            <tag-outlined />
            <span>Add Products</span>
          </a-menu-item>
          <a-menu-item key="4">
            <user-outlined />
            <span>Add Suppliers</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
    </a-layout>
    <!-- body -->
  </a-layout>
</template>

<script>
// @ is an alias to /src
import ConnectButton from "@/components/ConnectButton.vue";

import {
  HomeOutlined,
  UserOutlined,
  WalletOutlined,
  TagOutlined,
  ContainerOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    ConnectButton,
    HomeOutlined,
    UserOutlined,
    WalletOutlined,
    TagOutlined,
    ContainerOutlined,
  },
  setup() {
    const current = ref(["1"]);
    const collapsed = ref(true);
    return {
      current,
      collapsed,
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
