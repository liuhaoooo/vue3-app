import { CMD } from "../config/cmd";
import router from "../router";
import { axiosRequest_post, axiosRequest_get } from "../utils/request";
import store from "../store";
import { Modal } from "ant-design-vue";
import { rsaPubKey,rsaPrivateKey } from "../config/config"
import { JSEncrypt } from 'jsencrypt';
export const logout_tool = title => {
    if (!title) {
        axiosRequest_post({ cmd: CMD.LOGOUT }).then(res => {
            sessionStorage.clear()
            router.push("/login");
        });
        return
    }
    Modal.confirm({
        title,
        centered: true,
        okText: "确定",
        cancelText: "取消",
        onOk() {
            axiosRequest_post({ cmd: CMD.LOGOUT }).then(res => {
                sessionStorage.clear()
                router.push("/login");
            });
        }
    });
}
export const restart_tool = title => {
    if (!title) {
        return
    }
    Modal.confirm({
        title,
        centered: true,
        okText: "确定",
        cancelText: "取消",
        onOk() {
            axiosRequest_post({ cmd: CMD.SYS_REBOOT, rebootType: 2 }).then(() => {

            });
        }
    });
}
export const date_tool = val => {
    let day = Math.floor(val / (24 * 3600));
    let hour = Math.floor((val - day * 24 * 3600) / 3600);
    let minute = Math.floor((val - day * 24 * 3600 - hour * 3600) / 60);
    return `${day}天 ${hour}小时 ${minute}分`
}
export const parseHexPageHide_tool = hex => {
    if (!hex) return '00'
    let bits = ["00", "01", "02", "03",
        "10", "11", "12", "13",
        "20", "21", "22", "23",
        "30", "31", "32", "33"];
    let arr = [];
    let length = hex.length;
    for (let i = 0, len = length; i < len; i++) {
        arr.push(bits[parseInt(hex.charAt(i), 16)]);
    }
    let str = arr.join("");
    return str;
}
export const pageHideCheck_tool = index => {
    let arr = store.getters['config_vuex/webPageFlag'];
    let level = rsaDec_tool(sessionStorage['level'])
    if (arr[index] == "1") {
        if (level == "1" || level == "2") {
            return true;
        } else {
            return false;
        }
    } else if (arr[index] == "2") {
        if (level == "1" || level == "3") {
            return true;
        } else {
            return false;
        }
    } else if (arr[index] == "3") {
        return true;
    } else {
        if (level == "1") {
            return true;
        } else {
            return false;
        }
    }
}
//rsa加密
export const rsaEnc_tool = data => {
    let encryptStr = new JSEncrypt();
    encryptStr.setPublicKey(rsaPubKey);
    let result = encryptStr.encrypt(JSON.stringify(data));
    return result;
}
//rsa解密
export const rsaDec_tool = data => {
    let decrypt = new JSEncrypt()
    decrypt.setPrivateKey(rsaPrivateKey)
    let result = decrypt.decrypt(data)
    result = JSON.parse(result)
    return result
}
export const loading_tool = val =>{
    store.commit('sysStatus_vuex/setLoading',val) 
}