<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { LoadingOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    LoadingOutlined
  },
  setup(props, ctx) {
    const router = useRouter();
    const store = useStore();
    onMounted(() => {
      store.dispatch("config_vuex/getConfigInfo");
      store.dispatch("sysStatus_vuex/getNetworkInfo_post");
      router.replace({ name: store.getters["pagesData_vuex/route"][0].name });
      console.log("执行APP.vue");
    });
    return {};
  }
};
</script>
<style>
</style>
