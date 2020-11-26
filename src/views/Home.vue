<template>
  <div class="body">
    <herder-home />
    <a-layout id="components-layout-demo-top-side-2" style="height: calc(100vh - 204px);">
      <a-layout>
        <a-layout-sider width="200" style="background: #fff;border-radius:10px">
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
              <a-menu-item :key="item.key" v-for="item in items.child">{{item.title}}</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px;">
          <a-breadcrumb style="margin: 10px 0">
            <a-breadcrumb-item>{{breadcrumbItems['0']}}</a-breadcrumb-item>
            <a-breadcrumb-item>{{breadcrumbItems['1']}}</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0}">
            <index :routes="routes" />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
    <div class="footer">
      <span>Copyright © 1999-2020 中国移动 版权所有</span>
    </div>
  </div>
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
import {
  reactive,
  computed,
  toRefs,
  ref,
  watch,
  onMounted,
  onBeforeUnmount
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { CMD } from "../config/cmd";
import { axiosRequest_get } from "../utils/request";
import index from "../components/index.vue";
import herderHome from "../components/header.vue";
export default {
  components: {
    index,
    herderHome,
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
    onMounted(() => {
      clearInterval(window.getStatus_Interval);
      window.getStatus_Interval = setInterval(() => {
        axiosRequest_get({ cmd: CMD.GET_DEVICE_NAME });
      }, 5000);
    });
    onBeforeUnmount(() => {
      clearInterval(window.getStatus_Interval);
    });
    return {
      ...meun(props, ctx),
      ...route(props, ctx)
    };
  }
};
//左侧菜单相关
function meun(props, ctx) {
  const store = useStore();
  const router = useRouter();
  const selectedKeys = ref(["1-1"]);
  const openKeys = ref(["1"]);
  const breadcrumbItems = computed(() => store.getters["pagesData_vuex/breadcrumbItems"]);
  const pages = computed(() => store.getters["pagesData_vuex/pages"]);
  const routes = computed(() => store.getters["pagesData_vuex/route"]);
  const openClick = keyArr => {
    let i = keyArr[keyArr.length - 1];
    openKeys.value = [i];
    selectedKeys.value = [`${i}-1`];
    store.commit("pagesData_vuex/setRoute", selectedKeys.value);
    store.commit("pagesData_vuex/setBreadcrumbItems", {
      index: "1",
      value: routes.value[0].title
    });
    store.commit("pagesData_vuex/setBreadcrumbItems", {
      index: "0",
      value: pages.value[i-1].title
    });
    router.push({ name: routes.value[0].name });
  };
  return {
    selectedKeys,
    openKeys,
    pages,
    openClick,
    breadcrumbItems
  };
}
//路由相关
function route(props, ctx) {
  const store = useStore();
  const router = useRouter();
  const routes = computed(() => {
    return store.getters["pagesData_vuex/route"];
  });
  const itemSelect = item => {
    store.commit("pagesData_vuex/setRoute", item.key);
    router.push({ name: routes.value[0].name });
  };
  return {
    itemSelect,
    routes
  };
}
</script>
<style lang="less">
.body {
  width: 100vw;
  height: 100vh;
  padding-right: 70px;
  padding-left: 70px;
  padding-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: url(../assets/images/background.jpg) no-repeat;
  background-size: cover;
}
.ant-layout-has-sider {
  height: calc(~"100vh - 104px");
}
.footer {
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 12px;
}
</style>