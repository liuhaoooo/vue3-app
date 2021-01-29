<template>
  <div class="wifi_main">
    <div class="wifi_switch">
      <strong for>Wi-Fi总开关</strong>
      <a-switch v-model:checked="wifiOpen" @change="wifiOpenChange" />
      <span>关闭Wi-Fi总开关后，连接到该Wi-Fi的设备将会断开</span>
    </div>
    <div class="wifi_switch" v-if="wifiOpen">
      <strong for>5G优选</strong>
      <a-switch v-model:checked="wifi5.wifiSames" />
      <span>打开后，2.4G和5G信号合并显示，等同信号强度下优选更快的5G，关闭此开关，即可单独设置</span>
    </div>
    <!-- 5G优选 -->
    <div v-if="wifi5.wifiSames"></div>
    <div class="not5g" v-else>
      <!-- 2.4 -->
      <div v-if="wifiOpen">
        <div class="wifi_switch">
          <strong for>2.4G Wi-Fi</strong>
          <a-switch v-model:checked="wifi24.wifiOpen" />
          <a-checkbox
            v-model:checked="wifi24.broadcast"
            style="margin-left: 20px;"
            v-if="wifi24.wifiOpen"
          >隐藏Wi-Fi</a-checkbox>
        </div>
        <a-form
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 6 }"
          layout="vertical"
          style="margin-left: 160px;"
          ref="form_2g"
          :model="wifi24"
        >
          <div v-if="wifi24.wifiOpen">
            <a-form-item label="Wi-Fi名称" :rules="rules_2g['ssid']" name="ssid">
              <a-input v-model:value="wifi24.ssid" />
            </a-form-item>
            <a-form-item label="加密方式">
              <a-select v-model:value="wifi24.authenticationType">
                <a-select-option
                  v-for="(item,index) in authenticationOption"
                  :key="index"
                  :value="item.value"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
            <div v-if="wifi24.authenticationType!='OPEN'&&wifi24.authenticationType!='WEP'">
              <a-form-item label="WPA 加密">
                <a-select v-model:value="wifi24.wpa">
                  <a-select-option
                    v-for="(item,index) in encryptionItem"
                    :key="index"
                    :value="item.value"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="密码" :rules="rules_2g['key']" name="key">
                <a-input-password v-model:value="wifi24.key" />
              </a-form-item>
            </div>
            <div v-if="wifi24.authenticationType=='WEP'">
              <a-form-item label="WEP 认证">
                <a-select v-model:value="wifi24.wepauthentication">
                  <a-select-option
                    v-for="(item,index) in wepauthenOption"
                    :key="index"
                    :value="item.value"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="加密长度">
                <a-select v-model:value="wifi24.keylen">
                  <a-select-option value="64">64-bit</a-select-option>
                  <a-select-option value="128">128-bit</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="密钥"
                :rules="rules_2g['key1']"
                name="key1"
                v-if="wifi24.keylen=='64'"
              >
                <a-input v-model:value="wifi24.key1" />
              </a-form-item>
              <a-form-item label="密钥" :rules="rules_2g['key2']" name="key1" v-else>
                <a-input v-model:value="wifi24.key1" />
              </a-form-item>
            </div>
            <a-form-item label="WMM">
              <a-switch v-model:checked="wifi24.wifiwmm" />
            </a-form-item>
            <!-- 2.4高级 -->
            <div v-if="wifi24_adv.isShowAdv">
              <a-form-item label="发射功率">
                <a-select v-model:value="wifi24_adv.txPower">
                  <a-select-option
                    v-for="(item,index) in txOption_2g"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="信道">
                <a-select v-model:value="wifi24_adv.channel">
                  <a-select-option
                    v-for="(item,index) in channelOption_2g"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Wi-Fi工作模式">
                <a-select v-model:value="wifi24_adv.wifiWorkMode">
                  <a-select-option
                    v-for="(item,index) in wifiWorkMode_2g"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="带宽">
                <a-select v-model:value="wifi24_adv.bandWidth">
                  <a-select-option
                    v-for="(item,index) in bandWidthOption_2g"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div class="adv_button" @click="wifi24_adv.isShowAdv=!wifi24_adv.isShowAdv">
              {{wifi24_adv.isShowAdv?'收起':'展开'}}
              <component :is="wifi24_adv.isShowAdv?'UpOutlined':'DownOutlined'"></component>
            </div>
          </div>
        </a-form>
      </div>
      <!-- 5g -->
      <div v-if="wifiOpen">
        <div class="wifi_switch">
          <strong for>5G Wi-Fi</strong>
          <a-switch v-model:checked="wifi5.wifiOpen" />
          <a-checkbox
            v-model:checked="wifi5.broadcast"
            style="margin-left: 20px;"
            v-if="wifi5.wifiOpen"
          >隐藏Wi-Fi</a-checkbox>
        </div>
        <a-form
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 6 }"
          layout="vertical"
          style="margin-left: 160px;"
          ref="form_5g"
          :model="wifi5"
        >
          <div v-if="wifi5.wifiOpen">
            <a-form-item label="Wi-Fi名称" :rules="rules_5g['ssid']" name="ssid">
              <a-input v-model:value="wifi5.ssid" />
            </a-form-item>
            <a-form-item label="加密方式">
              <a-select v-model:value="wifi5.authenticationType">
                <a-select-option
                  v-for="(item,index) in authenticationOption"
                  :key="index"
                  :value="item.value"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
            <div v-if="wifi5.authenticationType!='OPEN'&&wifi5.authenticationType!='WEP'">
              <a-form-item label="WPA 加密">
                <a-select v-model:value="wifi5.wpa">
                  <a-select-option
                    v-for="(item,index) in encryptionItem"
                    :key="index"
                    :value="item.value"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="密码" :rules="rules_5g['key']" name="key">
                <a-input-password v-model:value="wifi5.key" />
              </a-form-item>
            </div>
            <div v-if="wifi5.authenticationType=='WEP'">
              <a-form-item label="WEP 认证">
                <a-select v-model:value="wifi5.wepauthentication">
                  <a-select-option
                    v-for="(item,index) in wepauthenOption"
                    :key="index"
                    :value="item.value"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="加密长度">
                <a-select v-model:value="wifi5.keylen">
                  <a-select-option value="64">64-bit</a-select-option>
                  <a-select-option value="128">128-bit</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="密钥"
                :rules="rules_5g['key1']"
                name="key1"
                v-if="wifi5.keylen=='64'"
              >
                <a-input v-model:value="wifi5.key1" />
              </a-form-item>
              <a-form-item label="密钥" :rules="rules_5g['key2']" name="key1" v-else>
                <a-input v-model:value="wifi5.key1" />
              </a-form-item>
            </div>
            <a-form-item label="WMM">
              <a-switch v-model:checked="wifi5.wifiwmm" />
            </a-form-item>
            <!-- 5g高级 -->
            <div v-if="wifi5_adv.isShowAdv">
              <a-form-item label="发射功率">
                <a-select v-model:value="wifi5_adv.txPower">
                  <a-select-option
                    v-for="(item,index) in txOption_5g"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="信道">
                <a-select v-model:value="wifi5_adv.channel">
                  <a-select-option
                    v-for="(item,index) in channelOption_2g"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Wi-Fi工作模式">
                <a-select v-model:value="wifi5_adv.wifiWorkMode">
                  <a-select-option
                    v-for="(item,index) in wifiWorkMode_5g"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="带宽">
                <a-select v-model:value="wifi5_adv.bandWidth">
                  <a-select-option
                    v-for="(item,index) in bandWidthOption_5g"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div class="adv_button" @click="wifi5_adv.isShowAdv=!wifi5_adv.isShowAdv">
              {{wifi5_adv.isShowAdv?'收起':'展开'}}
              <component :is="wifi5_adv.isShowAdv?'UpOutlined':'DownOutlined'"></component>
            </div>
          </div>
        </a-form>
      </div>
    </div>

    <div style="margin-left: 160px;" v-if="wifiOpen">
      <a-button type="primary" @click="submit">保存</a-button>
      <a-button style="margin-left: 10px;" @click="b">取消</a-button>
    </div>
  </div>
</template>
<script>
import { reactive, toRaw, ref, computed, onMounted, toRefs, watch } from "vue";
import { useForm } from "@ant-design-vue/use";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { CMD } from "@/config/cmd";
import { Base64 } from "js-base64";
import { useStore } from "vuex";
import { Modal,message } from "ant-design-vue";
import {loading_tool} from "@/utils/tools.js"
import { axiosRequest_get, axiosRequest_post } from "@/utils/request";
export default {
  components: { DownOutlined, UpOutlined },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const wifiOpen = ref(false);
    const form_2g = ref(null);
    const form_5g = ref(null);
    onMounted(() => {
      getData();
    });
    const meshOpen = computed(() => store.getters["sysStatus_vuex/meshOpen"]);
    const getData = async () => {
      store.dispatch("sysStatus_vuex/getMeshStatus");
      let res_wifiOpen = await axiosRequest_get({ cmd: CMD.WIFI_SWITCH });
      wifiOpen.value = res_wifiOpen.masterSwitch == "1";
    };
    const wifiOpenChange = e => {
      if (!e && meshOpen.value) {
        Modal.confirm({
          title: "关闭WIFI会导致MESH中断。",
          centered: true,
          okText: "确定",
          cancelText: "取消",
          onOk() {
            postWifiSwitch(e);
          },
          onCancel(){
            wifiOpen.value = !e
          }
        });
        return;
      }
      postWifiSwitch(e);
    };
    const postWifiSwitch = e => {
      loading_tool(true)
      axiosRequest_post({
        cmd: CMD.WIFI_SWITCH,
        masterSwitch: e ? "1" : "0"
      }).then(res => {
        setTimeout(()=>{
          loading_tool(false)
          message.success('设置成功')
        },3000)
      });
    };
    const submit = e => {
      e.preventDefault();
      Promise.all([form_2g.value.validate(), form_5g.value.validate()])
        .then(res => {
          console.log(toRaw(form_2g.value.model));
          console.log(toRaw(form_5g.value.model));
        })
        .catch(err => {
          console.log(err);
        });
    };
    return {
      t,
      meshOpen,
      wifiOpen,
      wifiOpenChange,
      submit,
      form_2g,
      form_5g,
      ...options_fn(),
      ...wifi2g_fn(),
      ...wifi5g_fn()
    };
  }
};
// 2.4gwifi相关
function wifi2g_fn() {
  const { t } = useI18n();
  const wifi24 = reactive({
    wifiOpen: true,
    ssid: "",
    authenticationType: "WPAPSKWPA2PSK", //加密方式
    wpa: "TKIP", //WPA 加密
    key: "", //密码
    key1: "",
    keylen: "64",
    broadcast: false, //隐藏Wi-Fi
    wifiwmm: true, //WMM
    wepauthentication: "OpenSystem" //WEP 认证
  });
  const wifi24_adv = reactive({
    isShowAdv: false,
    txPower: "1",
    channel: "0",
    wifiWorkMode: "0",
    bandWidth: "0"
  });
  const required = {
    required: true,
    message: t("tips.empty")
  };
  const Len = {
    len: 5,
    message: t("tips.wepKeyLen") + 5
  };
  const Len1 = {
    len: 13,
    message: t("tips.wepKeyLen") + 13
  };
  const rules_2g = {
    ssid: [required],
    key: [required],
    key1: [required, Len],
    key2: [required, Len1]
  };
  const getData = async () => {
    let res_2g = await axiosRequest_get({
      cmd: CMD.WIRELESS_CONFIG,
      subcmd: 0
    });
    let res_2g_adv = await axiosRequest_get({ cmd: CMD.WIRELESS_ADVANCE });
    for (let key in wifi24) {
      if (res_2g.hasOwnProperty(key)) {
        wifi24[key] = res_2g[key];
      }
    }
    wifi24.ssid = Base64.decode(wifi24.ssid);
    wifi24.wifiOpen = wifi24.wifiOpen == "1";
    wifi24.broadcast = wifi24.broadcast == "1";
    wifi24.wifiwmm = wifi24.wifiwmm == "1";
    for (let key in wifi24_adv) {
      if (res_2g_adv.hasOwnProperty(key)) {
        wifi24_adv[key] = res_2g_adv[key];
      }
    }
  };
  onMounted(() => {
    getData();
  });
  return {
    wifi24,
    wifi24_adv,
    rules_2g
  };
}
// 5gwifi相关
function wifi5g_fn() {
  const { t } = useI18n();
  const wifi5 = reactive({
    wifiOpen: true,
    wifiSames: false,
    ssid: "",
    authenticationType: "WPAPSKWPA2PSK", //加密方式
    wpa: "TKIP", //WPA 加密
    key: "", //密码
    key1: "",
    keylen: "64", //加密长度
    broadcast: false, //隐藏Wi-Fi
    wifiwmm: true, //WMM
    wepauthentication: "OpenSystem" //WEP 认证
  });
  const wifi5_adv = reactive({
    isShowAdv: false,
    txPower: "100",
    channel: "0",
    wifiWorkMode: "2",
    bandWidth: "0"
  });
  const required = {
    required: true,
    message: t("tips.empty")
  };
  const Len = {
    len: 5,
    message: t("tips.wepKeyLen") + 5
  };
  const Len1 = {
    len: 13,
    message: t("tips.wepKeyLen") + 13
  };
  const rules_5g = {
    ssid: [required],
    key: [required],
    key1: [required, Len],
    key2: [required, Len1]
  };
  const getData = async () => {
    let res_5g = await axiosRequest_get({
      cmd: CMD.WIRELESS5G_CONFIG,
      subcmd: 0
    });
    let res_5g_adv = await axiosRequest_get({ cmd: CMD.WIRELESS5G_ADVANCE });
    for (let key in wifi5) {
      if (res_5g.hasOwnProperty(key)) {
        wifi5[key] = res_5g[key];
      }
    }
    wifi5.ssid = Base64.decode(wifi5.ssid);
    wifi5.wifiOpen = wifi5.wifiOpen == "1";
    wifi5.wifiSames = wifi5.wifiSames == "1";
    wifi5.broadcast = wifi5.broadcast == "1";
    wifi5.wifiwmm = wifi5.wifiwmm == "1";
    for (let key in wifi5_adv) {
      if (res_5g_adv.hasOwnProperty(key)) {
        wifi5_adv[key] = res_5g_adv[key];
      }
    }
  };
  onMounted(() => {
    getData();
  });
  return {
    wifi5,
    wifi5_adv,
    rules_5g
  };
}
// select内容相关
function options_fn() {
  const authenticationOption = [
    { value: "OPEN", name: "None" },
    { value: "WEP", name: "WEP" },
    { value: "WPAPSK", name: "WPA-PSK" },
    { value: "WPA2PSK", name: "WPA2-PSK" },
    { value: "WPAPSKWPA2PSK", name: "WPA-PSK/WPA2-PSK" },
    { value: "WPA3PSK", name: "WPA3-PSK" },
    { value: "WPA2PSKWPA3PSK", name: "WPA2-PSK/WPA3-PSK" }
  ];
  const encryptionItem = [
    { name: "TKIP", value: "TKIP" },
    { name: "AES", value: "AES" },
    { name: "TKIP+AES", value: "TKIPAES" }
  ];
  const wepauthenOption = [
    { value: "OpenSystem", name: "open" },
    { value: "SharedKey", name: "share" },
    { value: "Both", name: "open+share" }
  ];
  const bandWidthOption_2g = [
    { name: "20MHz", value: "0" },
    { name: "20/40MHz", value: "2" },
    { name: "40MHz", value: "1" }
  ];
  const bandWidthOption_5g = [
    { name: "20MHz", value: "0" },
    { name: "40MHz", value: "1" },
    { name: "80MHz", value: "2" }
  ];
  const wifiWorkMode_2g = [
    { name: "11b only", value: "1" },
    { name: "11g only", value: "4" },
    { name: "11n only", value: "6" },
    { name: "11b/g", value: "0" },
    { name: "11b/g/n", value: "9" },
    { name: "11g/n/ax", value: "16" }
  ];
  const wifiWorkMode_5g = [
    { name: "11a only", value: "2" },
    { name: "11a/n", value: "8" },
    { name: "11a/n/ac", value: "14" },
    { name: "11n/ac/ax", value: "17" }
  ];
  const txOption_2g = [
    { name: "100%", value: "1" },
    { name: "75%", value: "2" },
    { name: "50%", value: "3" },
    { name: "35%", value: "4" },
    { name: "15%", value: "5" }
  ];
  const txOption_5g = [
    { name: "100%", value: "100" },
    { name: "75%", value: "80" },
    { name: "50%", value: "50" },
    { name: "35%", value: "25" },
    { name: "15%", value: "10" }
  ];
  const channelOption_2g = [
    { name: "自动", value: "0" },
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5", value: "5" },
    { name: "6", value: "6" },
    { name: "7", value: "7" },
    { name: "8", value: "8" },
    { name: "9", value: "9" },
    { name: "10", value: "10" },
    { name: "11", value: "11" },
    { name: "12", value: "12" },
    { name: "13", value: "13" }
  ];
  return {
    authenticationOption,
    encryptionItem,
    wepauthenOption,
    bandWidthOption_2g,
    bandWidthOption_5g,
    wifiWorkMode_2g,
    wifiWorkMode_5g,
    txOption_2g,
    txOption_5g,
    channelOption_2g
  };
}
</script>
<style lang="less">
.ant-form-vertical .ant-form-item {
  padding-bottom: 0 !important;
}
.wifi_main {
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .adv_button {
    color: #1890ff;
    cursor: pointer;
    width: 50%;
    margin-bottom: 20px;
    text-align: center;
  }
}
.wifi_switch {
  display: flex;
  margin-bottom: 20px;
  > strong {
    width: 160px;
  }
  > span {
    margin-left: 20px;
  }
}
</style>