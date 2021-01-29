<template>
  <div class="header_div">
    <div class="header_logo"></div>
    <div class="header_info">
      <div class="header_info1">{{t('header.title')}}</div>
      <div class="header_info2">
        <div>
          <WifiOutlined :style="`color:${wifi2g_color};font-size:26px`" />&nbsp;2.4G Wi-Fi
        </div>
        <div>
          <WifiOutlined :style="`color:${wifi5g_color};font-size:26px`" />&nbsp;5G Wi-Fi
        </div>
      </div>
      <div class="header_info3">
        <div>
          <SendOutlined />
          &nbsp;{{t('header.step')}}
        </div>
        <div @mouseover="show_qr=true" @mouseout="show_qr=false">
          <TabletOutlined />
          &nbsp;{{t('header.appdow')}}
        </div>
        <div @click="restart">
          <ReloadOutlined />
          &nbsp;{{t('header.restart')}}
        </div>
        <div @click="logout">
          <LogoutOutlined />
          &nbsp;{{t('header.logout')}}
        </div>
      </div>
    </div>
  </div>
  <div class="qr_div" v-show="show_qr">
    <img src="../assets/images/qr.png" alt />
    <br />
    <div>
      {{t('header.qr1')}}
      <br />
      {{t('header.qr2')}}
      <br />
      <span style="color: rgb(30, 109, 255);">{{t('header.qr3')}}</span>
      <br />
      {{t('header.qr4')}}
    </div>
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
  onBeforeUnmount
} from "vue";
import { CMD } from "../config/cmd";
import { useRoute, useRouter } from "vue-router";
import { axiosRequest_post, axiosRequest_get } from "../utils/request";
import { logout_tool, restart_tool } from "../utils/tools";
import { useI18n } from "vue-i18n";
import {
  WifiOutlined,
  LogoutOutlined,
  ReloadOutlined,
  TabletOutlined,
  SendOutlined
} from "@ant-design/icons-vue";
export default {
  components: {
    WifiOutlined,
    LogoutOutlined,
    ReloadOutlined,
    TabletOutlined,
    SendOutlined
  },
  setup(props, ctx) {
    const { t } = useI18n();
    return {
      t,
      ...right(props, ctx),
      ...status(props, ctx)
    };
  }
};
//右边操作栏
function right(props, ctx) {
  const router = useRouter();
  const { t } = useI18n();
  const show_qr = ref(false);
  const logout = () => logout_tool(t("tips.logout"));
  const restart = () => restart_tool(t("tips.restart"));
  return {
    logout,
    restart,
    show_qr
  };
}
//中间信号状态显示
function status(props, ctx) {
  const wifi2g_color = ref("#52c41a");
  const wifi5g_color = ref("#52c41a");
  const getwifiInfo = async () => {
    let res = await axiosRequest_get({ cmd: CMD.GET_SYS_STATUS });
    wifi2g_color.value = res.wlan2g_switch_0 == "1" ? "#52c41a" : "#ff2020";
    wifi5g_color.value = res.wlan5g_switch_0 == "1" ? "#52c41a" : "#ff2020";
    window.wifiTimeout = setTimeout(() => {
      getwifiInfo();
    }, 5000);
  };
  onMounted(() => {
    clearTimeout(window.wifiTimeout);
    getwifiInfo();
  });
  onBeforeUnmount(() => {
    clearTimeout(window.wifiTimeout);
  });
  return {
    getwifiInfo,
    wifi2g_color,
    wifi5g_color
  };
}
</script>
<style lang="less">
.header_div {
  display: flex;
  height: 70px;
  align-items: center;
  width: 100%;
  margin: 20px auto;
  background: #ffffff;
  border-radius: 5px;
  padding: 5px;
  > .header_logo {
    width: 200px;
    height: 85%;
    margin-left: 10px;
    background: url(../assets/images/logo.png) no-repeat;
    background-size: contain;
  }
  > .header_info {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
.header_info1 {
  font-size: 20px;
  font-weight: 600;
}
.header_info2 {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    font-size: 16px;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
}
.header_info3 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 400px;
  > div {
    display: flex;
    cursor: pointer;
    align-items: center;
  }
}
.qr_div {
  position: absolute;
  top: 80px;
  width: 140px;
  height: 210px;
  z-index: 99;
  background: rgb(226, 226, 226);
  padding: 10px;
  padding-bottom: 80px;
  border-radius: 4px;
  right: 260px;
  > img {
    width: 100%;
    height: 100%;
  }
  > div {
    color: #666;
    text-align: center;
    font-size: 12px;
  }
}
</style>
