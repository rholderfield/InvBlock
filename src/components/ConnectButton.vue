<template>
  <template v-if="!hasMetaMask">
    <a-button type="danger" @click="getMetaMask">Download Metamask</a-button>
  </template>
  <template v-else-if="isAuthenticated">
    {{ getEllipsisTxt(user.get("ethAddress"), 5) }}
    <a-button type="primary" @click="logout">Logout</a-button>
  </template>
  <template v-else>
    <a-button type="primary" @click="login">Connect wallet</a-button>
  </template>
</template>

<script>
import { onMounted, inject, computed } from "vue";
import { useStore } from "vuex";
import { getEllipsisTxt } from "../helpers/formatters.js";

export default {
  name: "ConnectButton",
  setup() {
    const store = useStore();
    const $moralis = inject("$moralis");

    const setUser = (payload) => store.commit("setUser", payload);

    const checkMetaMask = () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          store.commit("setHasMetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getMetaMask = () => {
      window.open("https://metamask.io/");
    };

    const login = async () => {
      const user = await $moralis.Web3.authenticate();
      setUser(user);
    };

    const logout = async () => {
      await $moralis.User.logOut();
      setUser({});
    };

    const handleCurrentUser = () => {
      checkMetaMask();
      const user = $moralis.User.current();
      if (user) {
        setUser(user);
      }
    };

    onMounted(() => {
      handleCurrentUser();
    });

    return {
      getMetaMask,
      getEllipsisTxt,
      login,
      logout,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      user: computed(() => store.state.user),
      hasMetaMask: computed(() => store.state.hasMetaMask),
    };
  },
};
</script>