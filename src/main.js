import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Moralis from './plugins/moralis'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

createApp(App).use(router)
    .provide('$moralis', Moralis)
    .use(store)
    .use(Antd)
    .mount('#app')
