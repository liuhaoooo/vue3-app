<template>
  <div>
    <a-descriptions title="无线状态" layout="vertical" bordered :column="2" v-show="!is_5g">
      <a-descriptions-item label="2.4G Wi-Fi">
        <a-descriptions title="CMCC-7CF5" layout="horizontal" bordered :column="1">
          <a-descriptions-item label="带宽:">20/40MHz</a-descriptions-item>
          <a-descriptions-item label="信道:">1</a-descriptions-item>
          <a-descriptions-item label="当前模式:">11n only</a-descriptions-item>
        </a-descriptions>
      </a-descriptions-item>
      <a-descriptions-item label="5G Wi-Fi">
        <a-descriptions title="CMCC-7CF5-5G" layout="horizontal" bordered :column="1">
          <a-descriptions-item label="带宽:">40MHz</a-descriptions-item>
          <a-descriptions-item label="信道:">64</a-descriptions-item>
          <a-descriptions-item label="当前模式:">11n only</a-descriptions-item>
        </a-descriptions>
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions title="无线状态" layout="vertical" bordered :column="1" v-show="is_5g">
      <a-descriptions-item label="Wi-Fi(5G优先)">
        <a-descriptions layout="vertical" bordered :column="2" title="CMCC-7CF5-5G">
          <a-descriptions-item label="2.4G Wi-Fi">
            <a-descriptions layout="horizontal" bordered :column="1">
              <a-descriptions-item label="带宽:">40MHz</a-descriptions-item>
              <a-descriptions-item label="信道:">64</a-descriptions-item>
              <a-descriptions-item label="当前模式:">11n only</a-descriptions-item>
            </a-descriptions>
          </a-descriptions-item>
          <a-descriptions-item label="5G Wi-Fi">
            <a-descriptions layout="horizontal" bordered :column="1">
              <a-descriptions-item label="带宽:">40MHz</a-descriptions-item>
              <a-descriptions-item label="信道:">64</a-descriptions-item>
              <a-descriptions-item label="当前模式:">11n only</a-descriptions-item>
            </a-descriptions>
          </a-descriptions-item>
        </a-descriptions>
      </a-descriptions-item>
    </a-descriptions>
    <br />
    <a-descriptions title="网络信息" layout="vertical" bordered :column="3">
      <a-descriptions-item label="工作模式">wan口未连接</a-descriptions-item>
      <a-descriptions-item label="WAN IP 地址">-----</a-descriptions-item>
      <a-descriptions-item label="WAN MAC 地址">-----</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup(props, ctx) {
    const store = useStore();
    const networkInfo = computed(() => {
      return store.getters['sysStatus_vuex/networkInfo'];
    });
    const is_5g = computed(() => {
      return store.getters['sysStatus_vuex/wifi5gInfo'].wifiSames == "1";
    });
    onMounted(() => {
      store.dispatch("sysStatus_vuex/getNetworkInfo");
      store.dispatch("sysStatus_vuex/getWifi5gInfo", { subcmd: 0 });
    });
    return {
      networkInfo,
      is_5g
    };
  }
};
</script>