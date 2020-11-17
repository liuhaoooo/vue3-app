import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './i18n'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const Vue = createApp(App)
Vue.use(store);
Vue.use(router);
Vue.use(Antd);
Vue.use(i18n);
Vue.mount('#app');