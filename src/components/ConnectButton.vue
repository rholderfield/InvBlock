<template>
      <template v-if="isAuthenticated">
        {{getEllipsisTxt(user.get('ethAddress'), 5)}} <a-button type="primary" @click="logout">Logout</a-button>
      </template>
      <template v-else>
        <a-button type="primary" @click="login">Connect wallet</a-button>
      </template> 
</template>

<script>
import { onMounted, inject, computed } from 'vue'
import { useStore } from 'vuex'
import { getEllipsisTxt } from '../helpers/formatters.js'


export default {
  name: 'ConnectButton',
  setup() {
    const store = useStore()
    const $moralis = inject('$moralis')

    const setUser = (payload) => store.commit('setUser', payload)
    
    const login = async () => {
      const user = await $moralis.Web3.authenticate()
      setUser(user)
    }

    const logout = async () => {
      await $moralis.User.logOut()
      setUser({})
    }

    const handleCurrentUser = () => {
      const user = $moralis.User.current()
      if (user) {
        setUser(user)
      }
    }

    onMounted(() => {
      handleCurrentUser()
    })

    return {
      getEllipsisTxt,
      login,
      logout,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      user: computed(() => store.state.user)
    }
  }
}
</script>

<style>

.text-center { text-align: center; }
.text-moralis-green { color: #b7e803; }
.text-moralis-gray { color: #041836; }
.mt-4 { margin-top: 20px }
.mt-1 { margin-top: 4px }
.mt-10 { margin-top: 40px }
.text-xl { font-size: 28px; }
.text-base { font-size: 16px; }
.font-semibold { font-weight: 600; }

</style>
