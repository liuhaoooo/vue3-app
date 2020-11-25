import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      // info
      {
        path: 'device_status',
        name: 'device_status',
        component: () => import('../views/pages/info/device_status.vue')
      },
      {
        path: 'dhcp_status',
        name: 'dhcp_status',
        component: () => import('../views/pages/info/dhcp/dhcp_status.vue')
      },
      {
        path: 'lan_list',
        name: 'lan_list',
        component: () => import('../views/pages/info/dhcp/lan_list.vue')
      },
      {
        path: 'wifi_status',
        name: 'wifi_status',
        component: () => import('../views/pages/info/wifiInfo/wifi_status.vue')
      },
      {
        path: 'connect_list',
        name: 'connect_list',
        component: () => import('../views/pages/info/wifiInfo/connect_list.vue')
      },
      // network
      {
        path: 'broadband',
        name: 'broadband',
        component: () => import('../views/pages/network/networkSetting/broadband.vue')
      },
      {
        path: 'relay_setting',
        name: 'relay_setting',
        component: () => import('../views/pages/network/networkSetting/relay_setting.vue')
      },
      {
        path: 'relay',
        name: 'relay',
        component: () => import('../views/pages/network/networkSetting/relay.vue')
      },
      {
        path: 'andlink',
        name: 'andlink',
        component: () => import('../views/pages/network/andlink.vue')
      },
      // wifi
      {
        path: 'wifisetting',
        name: 'wifisetting',
        component: () => import('../views/pages/wifi/wifisetting.vue')
      },
      // system
      {
        path: 'device_info',
        name: 'device_info',
        component: () => import('../views/pages/system/device_info.vue')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
