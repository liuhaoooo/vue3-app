<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          @openChange="openClick"
          @select="itemSelect"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu :key="items.key" v-for="items in pages">
            <template v-slot:title>
              <span>
                <component :is="items.icon"></component>
                {{items.title}}
              </span>
            </template>
            <a-menu-item :key="item.key" v-for="item in items.child">
              <router-link :to="item.route">{{item.title}}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 10px 0">
          <a-breadcrumb-item>{{breadcrumbItems['0']}}</a-breadcrumb-item>
          <a-breadcrumb-item>{{breadcrumbItems['1']}}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0}"
        >
          <a-tabs @change="tabsChange">
            <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
          </a-tabs>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from "@ant-design/icons-vue";
import {
  WifiOutlined,
  CopyOutlined,
  ControlOutlined,
  HddOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    //icon
    WifiOutlined,
    CopyOutlined,
    ControlOutlined,
    HddOutlined,
    MobileOutlined,
    SafetyCertificateOutlined,
    SettingOutlined
  },
  setup(props, ctx) {
    const store = useStore();
    const selectedKeys = ref(["1-1"]);
    const openKeys = ref(["1"]);
    const breadcrumbItems = reactive({
      '0':'系统状态',
      '1':'设备状态'
    })
    const pages = computed(() => {
      return store.getters.pages;
    });
    const openClick = keyArr =>{
      let i = keyArr[keyArr.length-1]
      openKeys.value = [i]
      selectedKeys.value = [`${i}-1`]
    }
    const itemSelect = (item)=>{
      console.log(item.key)
    }
    const tabsChange = key => {
      console.log(key);
    };
    return {
      selectedKeys,
      openKeys,
      pages,
      tabsChange,
      openClick,
      breadcrumbItems,
      itemSelect
    };
  }
};
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.ant-layout-has-sider {
  height: calc(100vh - 64px);
}
</style>