import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Moralis from './plugins/moralis'
import router from './router'

createApp(App).use(router)
    .provide('$moralis', Moralis)
    .use(store)
    .mount('#app')
