<template>
  <a-tabs @change="tabsChange">
    <a-tab-pane :key="index" :tab="item.title" v-for="(item ,index) in routes"></a-tab-pane>
  </a-tabs>
  <div class="index_content">
    <router-view />
  </div>
</template>

<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";
import { CMD } from "../config/cmd";
import { useRoute, useRouter } from "vue-router";
import { axiosRequest_get } from "../utils/request";
import { useStore } from "vuex";
export default {
  props: {
    routes: Array
  },
  setup(props, ctx) {
    const { routes } = toRefs(props);
    const router = useRouter();
    const store = useStore();
    const tabsChange = index => {
      store.commit("pagesData_vuex/setBreadcrumbItems", {
        index:'1',
        value:routes.value[index].title
      });
      router.push({name:routes.value[index].name});
    };
    onMounted(async () => {
      
    });
    return {
      tabsChange,
      routes
    };
  }
};
</script>
<style lang="less">
.index_content {
  overflow-y: auto;
  height: calc(~"100% - 50px") !important;
}
.index_content::-webkit-scrollbar{width: 5px;height:5px;background-color:#82c9ff;}/*定义滚动条轨道 内阴影+圆角*/
.index_content::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px #e7e7e7;border-radius: 10px; background-color:#e7e7e7;}/*定义滑块 内阴影+圆角*/
.index_content::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px #cbe7fc;background-color:#82c9ff;}
</style>