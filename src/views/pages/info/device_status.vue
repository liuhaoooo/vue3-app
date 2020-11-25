<template>
  <div>
    <a-descriptions
      :title="t('device_status.wifiStatus')"
      layout="vertical"
      bordered
      :column="2"
      v-show="!is_5g"
    >
      <a-descriptions-item label="2.4G Wi-Fi">
        <a-descriptions
          :title="networkInfo.wifiName_4g||t('device_status.close')"
          layout="horizontal"
          bordered
          :column="1"
        >
          <a-descriptions-item
            :label="t('device_status.broadband')"
          >{{t(`device_status.bandwidth_4g_arr['${networkInfo.bandwidth_4g}']`)}}</a-descriptions-item>
          <a-descriptions-item :label="t('device_status.channel')">{{networkInfo.channel_4g||'------'}}</a-descriptions-item>
          <a-descriptions-item
            :label="t('device_status.mode')"
          >{{t(`device_status.mode_4g_arr['${networkInfo.mode_4g}']`)}}</a-descriptions-item>
        </a-descriptions>
      </a-descriptions-item>
      <a-descriptions-item label="5G Wi-Fi">
        <a-descriptions
          :title="networkInfo.wifiName_5g||t('device_status.close')"
          layout="horizontal"
          bordered
          :column="1"
        >
          <a-descriptions-item
            :label="t('device_status.broadband')"
          >{{t(`device_status.bandwidth_5g_arr['${networkInfo.bandwidth_5g}']`)}}</a-descriptions-item>
          <a-descriptions-item :label="t('device_status.channel')">{{networkInfo.channel_5g||'------'}}</a-descriptions-item>
          <a-descriptions-item
            :label="t('device_status.mode')"
          >{{t(`device_status.mode_5g_arr['${networkInfo.mode_5g}']`)}}</a-descriptions-item>
        </a-descriptions>
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions
      :title="t('device_status.wifiStatus')+t('device_status.is5g')"
      layout="vertical"
      bordered
      :column="1"
      v-show="is_5g"
    >
      <a-descriptions-item>
        <a-descriptions
          layout="vertical"
          bordered
          :column="2"
          :title="networkInfo.wifiName_5g||t('device_status.close')"
        >
          <a-descriptions-item label="2.4G Wi-Fi">
            <a-descriptions layout="horizontal" bordered :column="1">
              <a-descriptions-item
                :label="t('device_status.broadband')"
              >{{t(`device_status.bandwidth_4g_arr['${networkInfo.bandwidth_4g}']`)}}</a-descriptions-item>
              <a-descriptions-item :label="t('device_status.channel')">{{networkInfo.channel_4g||'------'}}</a-descriptions-item>
              <a-descriptions-item
                :label="t('device_status.mode')"
              >{{t(`device_status.mode_4g_arr['${networkInfo.mode_4g}']`)}}</a-descriptions-item>
            </a-descriptions>
          </a-descriptions-item>
          <a-descriptions-item label="5G Wi-Fi">
            <a-descriptions layout="horizontal" bordered :column="1">
              <a-descriptions-item
                :label="t('device_status.broadband')"
              >{{t(`device_status.bandwidth_5g_arr['${networkInfo.bandwidth_5g}']`)}}</a-descriptions-item>
              <a-descriptions-item :label="t('device_status.channel')">{{networkInfo.channel_5g||'------'}}</a-descriptions-item>
              <a-descriptions-item
                :label="t('device_status.mode')"
              >{{t(`device_status.mode_5g_arr['${networkInfo.mode_5g}']`)}}</a-descriptions-item>
            </a-descriptions>
          </a-descriptions-item>
        </a-descriptions>
      </a-descriptions-item>
    </a-descriptions>
    <br />
    <a-descriptions :title="t('device_status.networkInfo')" layout="vertical" bordered :column="3">
      <a-descriptions-item
        :label="t('device_status.workingMode')"
      >{{t(`device_status.mode_arr['${networkInfo.work_mode}']`)}}</a-descriptions-item>
      <a-descriptions-item :label="t('device_status.wanip')">{{networkInfo.wan_ip_v4||'------'}}</a-descriptions-item>
      <a-descriptions-item :label="t('device_status.wanmac')">{{networkInfo.wan_mac||'------'}}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
export default {
  setup(props, ctx) {
    const { t } = useI18n();
    const store = useStore();
    const networkInfo = computed(() => store.getters["sysStatus_vuex/networkInfo"]);
    const is_5g = computed(() => {
      return store.getters["sysStatus_vuex/wifi5gInfo"].wifiSames == "1";
    });
    onMounted(() => {
      store.dispatch("sysStatus_vuex/getNetworkInfo");
      store.dispatch("sysStatus_vuex/getWifi5gInfo", { subcmd: 0 });
    });
    return {
      t,
      networkInfo,
      is_5g
    };
  }
};
</script>