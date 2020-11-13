<template>
  <div>
    <router-view />
  </div>
</template>
<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props, ctx) {
    const router = useRouter();
    const store = useStore();
    onMounted(()=>{
      store.dispatch('config_vuex/getConfigInfo')
      router.replace({name:store.getters['pagesData_vuex/route'][0].name})
      console.log('执行APP.vue')
    })
    return {};
  }
};
</script>
<style>
</style>
