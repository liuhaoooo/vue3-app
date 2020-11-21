<template>
  <div class="login_content">
    <div class="login_main">
      <img src="../assets/images/login_logo.png" alt />
      <label>{{t('login.welcome')}}</label>
      <!--  -->
      <a-form>
        <a-form-item v-bind="validateInfos.userName">
          <a-input
            v-model:value="modelRef.userName"
            :placeholder="t('login.username')"
            enter-button
            size="large"
            :disabled="loginTimesIsShow"
          >
            <template v-slot:prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input-search
            v-model:value="modelRef.password"
            :placeholder="t('login.password')"
            :enter-button="loginTimesIsShow?times:t('login.tologin')"
            :disabled="loginTimesIsShow"
            size="large"
            @search="toLogin"
            type="password"
            :loading="logining"
          >
            <template v-slot:prefix>
              <LockOutlined />
            </template>
          </a-input-search>
        </a-form-item>
      </a-form>
      <a-tooltip placement="right">
        <template v-slot:title>{{t('login.forgetPassInfo')}}</template>
        <p style="width:80px">{{t('login.forgetPass')}}</p>
      </a-tooltip>
      <div class="login_qr">
        <img src="../assets/images/qr.png" alt />
        <span>
          {{t('login.qr')}}
          <br />
          {{t('login.app')}}
        </span>
      </div>
      <a-select v-model:value="lang" style="width: 120px" @select="langChange">
        <a-select-option value="zh">中文</a-select-option>
        <a-select-option value="en">English</a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from "vue";
import { CMD } from "../config/cmd";
import { encode } from "js-base64";
import { Modal } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { axiosRequest_post, axiosRequest_get } from "../utils/request";
import { useForm } from "@ant-design-vue/use";
import { rsaEnc_tool, rsaDec_tool } from "../utils/tools";
import { useI18n } from "vue-i18n";
import { setLang } from "../i18n";
import {
  UserOutlined,
  LockOutlined,
  CaretRightOutlined
} from "@ant-design/icons-vue";
export default {
  components: {
    UserOutlined,
    LockOutlined,
    CaretRightOutlined
  },
  setup(props, ctx) {
    const { t } = useI18n();
    const lang = ref("zh");
    const modelRef = reactive({
      userName: "",
      password: ""
    });
    const rules = reactive({
      userName: [
        {
          required: true,
          message: t("login.username")
        }
      ],
      password: [
        {
          required: true,
          message: t("login.password")
        }
      ]
    });
    const { resetFields, validate, validateInfos } = useForm(modelRef, rules);
    const router = useRouter();
    const times = ref(0);
    const logining = ref(false);
    const loginTimesIsShow = ref(false);
    onMounted(() => {
      getNextText();
    });
    const langChange = (val) =>setLang(val);
    const toLogin = () => {
      validate()
        .then(res => {
          logining.value = true;
          let json = {
            cmd: CMD.LOGIN,
            username: modelRef.userName,
            passwd: encode(modelRef.password),
            isAutoUpgrade: "0"
          };
          axiosRequest_post(json)
            .then(res => {
              if (res.login_fail == "fail") {
                logining.value = false;
                Modal.error({
                  okText: t("login.okText"),
                  centered: true,
                  title: t("login.tipTitle"),
                  content: t("login.tipContent") + res.login_times
                });
                if (parseInt(res.login_times, 10) < 1) {
                  getNextText();
                }
              } else {
                sessionStorage.setItem("sessionId", rsaEnc_tool(res.sessionId));
                sessionStorage.setItem("level", rsaEnc_tool(res.user_level));
                router.push("/device_status");
              }
            })
            .catch(err => {
              logining.value = false;
            });
        })
        .catch(err => {});
    };
    const getNextText = async () => {
      let res = await axiosRequest_get({ cmd: CMD.GET_NEXT_LOGIN_TIME });
      if (res.buffer == "0") {
        times.value = 180 - res.netx_login_time;
        loginTimesIsShow.value = true;
        setTimeout(() => {
          getNextText();
        }, 1000);
      } else {
        loginTimesIsShow.value = false;
      }
    };
    return {
      t,
      lang,
      langChange,
      logining,
      toLogin,
      times,
      loginTimesIsShow,
      validateInfos,
      modelRef
    };
  }
};
</script>
<style>
.login_content {
  width: 100vw;
  height: 100vh;
  background: url(../assets/images/login_background.png);
  background-size: cover;
  position: relative;
}
.login_main {
  position: absolute;
  right: 14%;
  width: 18%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login_main > label {
  color: #ffffff;
  font-size: 20px;
}
.login_main > p {
  color: #cecece;
  font-size: 14px;
  cursor: pointer;
}
.login_main > * {
  margin-bottom: 20px;
  margin-top: 20px !important;
  width: 240px;
}
.login_button {
  cursor: pointer;
}
.login_qr {
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
}
.login_qr > img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
</style>
