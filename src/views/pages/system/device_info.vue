<template>
  <div>
    <a-descriptions title="设备信息" layout="vertical" bordered :column="3">
      <a-descriptions-item label="设备型号">{{deviceInfo.board_type||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="设备厂商">{{deviceInfo.device_firm||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="SN">{{deviceInfo.device_sn||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="硬件版本">{{deviceInfo.hwversion||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="软件版本">{{deviceInfo.real_fwversion||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="运行时长">{{deviceInfo.uptime||'-----'}}</a-descriptions-item>
      <!-- level=1 -->
      <a-descriptions-item label="配置版本">{{deviceInfo.config_version||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="MTK7561编译时间">{{deviceInfo.build_date||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="git 分支">{{deviceInfo.git_branch||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="TZ版本">{{deviceInfo.fake_version||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="CMEI">{{deviceInfo.device_cmei||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="平均负载">{{deviceInfo.cpuload||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="内存总量">{{deviceInfo.memory1||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="可用内存">{{deviceInfo.memory2||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="内存缓存">{{deviceInfo.memory3||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="git commit 号">{{deviceInfo.git_sha||'-----'}}</a-descriptions-item>
    </a-descriptions>
    <br />
    <a-descriptions title="IPv4" layout="vertical" bordered :column="4">
      <a-descriptions-item label="WAN IP 地址">{{networkInfo.wan_ip_v4||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="LAN IP 地址">{{networkInfo.lan_ip_v4||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="默认网关">{{networkInfo.gateway_v4||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="DNS 服务器">{{networkInfo.dns_v4||'-----'}}</a-descriptions-item>
    </a-descriptions>
    <br />
    <a-descriptions title="IPv6" layout="vertical" bordered :column="3">
      <a-descriptions-item label="默认网关">{{networkInfo.gateway_v6||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="DNS 服务器">{{networkInfo.dns_v6||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="前缀">{{networkInfo.prefix||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="链路本地地址">{{networkInfo.link_addr||'-----'}}</a-descriptions-item>
      <a-descriptions-item label="WAN IP 地址">{{networkInfo.wan_ip_v6||'-----'}}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import {
  reactive,
  computed,
  toRefs,
  ref,
  watch,
  onMounted,
  getCurrentInstance,
  onBeforeUnmount
} from "vue";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    const { ctx } = getCurrentInstance();
    const networkInfo = computed(() => store.getters["sysStatus_vuex/networkInfo"]);
    const deviceInfo = computed(() => store.getters["sysStatus_vuex/deviceInfo"]);
    onMounted(() => {
      clearInterval(window.deviceInfoInterval);
      store.dispatch("sysStatus_vuex/getNetworkInfo");
      store.dispatch("sysStatus_vuex/getDeviceInfo");
      window.deviceInfoInterval = setInterval(() => {
        store.dispatch("sysStatus_vuex/getDeviceInfo");
      }, 30000);
    });
    onBeforeUnmount(() => {
      clearInterval(window.deviceInfoInterval);
    });
    return {
      networkInfo,
      deviceInfo
    };
  }
};
</script>