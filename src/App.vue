<template>
  <a-layout>
    <!-- header -->
    <a-layout-header
      :style="{ height: 'auto', background: 'none', padding: '0px' }"
    >
      <div id="nav">
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
          <li :style="{ marginLeft: 'auto', order: '6', paddingRight: '6px' }">
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
      <a-layout-sider :style="{ backgroundColor: '#1890ff' }">
        Sider
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
    const collapsed = ref(false);
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
