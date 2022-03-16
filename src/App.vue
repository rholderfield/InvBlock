<template>
  <a-layout>
    <!-- header -->
    <a-layout-header
      :style="{ height: 'auto', background: 'none', padding: '0px' }"
    >
      <div id="nav">
        <div
          :style="{
            float: 'left',
            paddingLeft: '8px',
            backgroundColor: '#FFFFFF',
          }"
        >
          <img alt="logo" width="32" src="./assets/pixlogo.png" />
          <a-divider type="vertical" />
          <router-link to="/"> Home </router-link>
          <a-divider type="vertical" />
        </div>
        <a-menu mode="horizontal" :style="{ lineHeight: '64px' }">
          <li
            key="1"
            :style="{ marginLeft: 'auto', order: '6', paddingRight: '8px' }"
          >
            <ConnectButton />
          </li>
        </a-menu>
      </div>
    </a-layout-header>
    <!-- header -->

    <!-- body -->
    <a-layout class="ant-layout-has-sider">
      <a-layout-sider collapsible theme="light" :style="{ border: 'box' }" :defaultCollapsed="collapsed">
        <div class="logo" />
        <br />
        <a-menu mode="inline" v-model:selectedKeys="current">
          <a-menu-item-group key="sales">
            <template #title>Sales</template>
            <a-menu-item key="1">
              <router-link to="/salesorder">
                <container-filled />
                <span>Sales Order List</span></router-link
              >
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="/addsalesorder">
                <container-outlined />
                <span> Add Sales Order</span></router-link
              >
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="purchasing">
            <template #title>Purchasing</template>
            <a-menu-item key="3">
              <router-link to="/purchaseorder">
                <wallet-filled />
                <span> Purchase Order List</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link to="/addpurchaseorder">
                <wallet-outlined />
                <span> Add Purchase Order</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="suppliers">
            <template #title>Suppliers</template>
            <a-menu-item key="5">
              <router-link to="/suppliers">
                <contacts-outlined />
                <span> Suppliers List</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="6">
              <router-link to="/addsupplier">
                <user-outlined />
                <span> Add Supplier</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="products">
            <template #title>Products</template>
            <a-menu-item key="7">
              <router-link to="/products">
                <tags-outlined />
                <span> Products List</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key="8">
              <router-link to="/addproduct">
                <tag-outlined />
                <span> Add Product</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-menu>
      </a-layout-sider>
      <a-layout-content
        :style="{
          background: '#fff',
          padding: '0 24px',
          minHeight: 'calc(90vh - 70px)',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
    <!-- body -->
  </a-layout>
</template>

<script>
// @ is an alias to /src
import ConnectButton from "@/components/ConnectButton.vue";

import {
  UserOutlined,
  ContactsOutlined,
  WalletOutlined,
  WalletFilled,
  TagOutlined,
  TagsOutlined,
  ContainerOutlined,
  ContainerFilled,
} from "@ant-design/icons-vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    ConnectButton,
    UserOutlined,
    ContactsOutlined,
    WalletOutlined,
    WalletFilled,
    TagOutlined,
    TagsOutlined,
    ContainerOutlined,
    ContainerFilled,
  },
  setup() {
    const current = ref(["0"]);
    const collapsed =ref(true);
    return {
      current,
      collapsed
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
  color: #05182a;
}

button.ant-btn {
  color: #05182a;
}

button.ant-btn:hover,
button.ant-btn:focus,
button.ant-btn:active {
  color: #05182a;
}

.ant-menu-item-group-title a {
  font-weight: 500;

  color: #05182a;
}
</style>
